import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import * as QRCode from 'qrcode';

type VerificationRecord = CreateVerificationDto & {
  id: string;
  verification_id: string;
  created_at: string;
};

// Retry helper with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 500,
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
      const delay = delayMs * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, (err as Error).message);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

// A simple function to generate a short unique ID
// We use crypto.randomUUID() available in Node 14.17+
function generateVerificationId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 16);
}

@Injectable()
export class VerificationService {
  constructor(private readonly supabase: SupabaseService) {}

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  async create(
    dto: CreateVerificationDto,
    frontendBase?: string,
  ): Promise<{
    verification_id: string;
    verification_url: string;
    qrCodeDataUrl: string;
    record: CreateVerificationDto & {
      id: string;
      verification_id: string;
      created_at: string;
    };
  }> {
    // Enforce word count limits before touching the database
    const courseWords = this.countWords(dto.course_information);

    if (courseWords > 500) {
      throw new BadRequestException(
        `course_information exceeds 500 words (current: ${courseWords})`,
      );
    }

    // Validate modules array
    if (!Array.isArray(dto.modules_completed) || dto.modules_completed.length === 0) {
      throw new BadRequestException(
        'modules_completed must be a non-empty array',
      );
    }

    const verification_id = generateVerificationId();
    const base =
      frontendBase ?? process.env.FRONTEND_URL ?? 'http://localhost:3000';
    // ensure a proper absolute URL even if base has no trailing slash
    const verification_url = new URL(
      `/verify/${verification_id}`,
      base,
    ).toString();

    // Insert into Supabase using the service role client (bypasses RLS)
    const insertRes = await this.supabase.adminClient
      .from('verification_records')
      .insert({
        verification_id,
        name: dto.name,
        student_id: dto.student_id,
        course_completed: dto.course_completed,
        date_of_completion: dto.date_of_completion,
        email: dto.email,
        total_study_time: dto.total_study_time,
        final_assessment_score: dto.final_assessment_score,
        cpd_hours_completed: dto.cpd_hours_completed,
        course_information: dto.course_information,
        modules_completed: dto.modules_completed,
      })
      .select()
      .single();

    const insertTyped = insertRes as {
      data: VerificationRecord | null;
      error?: unknown;
    };

    if (insertTyped.error) {
      console.error('Supabase insert error:', insertTyped.error);
      throw new InternalServerErrorException(
        'Failed to save verification record',
      );
    }

    const data = insertTyped.data;

    if (!data) {
      console.error('Supabase insert returned no data');
      throw new InternalServerErrorException(
        'Failed to save verification record (no data)',
      );
    }

    // Generate QR code as a base64 data URL
    const qrCodeDataUrl = await QRCode.toDataURL(verification_url, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
    });

    return {
      verification_id,
      verification_url,
      qrCodeDataUrl,
      record: data,
    };
  }

  async findByVerificationId(
    verification_id: string,
  ): Promise<VerificationRecord> {
    const res = await retryWithBackoff(
      async () => {
        return await this.supabase.adminClient
          .from('verification_records')
          .select('*')
          .eq('verification_id', verification_id)
          .single();
      },
      3,
      500,
    );

    const typed = res as { data: VerificationRecord | null; error?: unknown };

    if (typed.error || !typed.data) {
      throw new NotFoundException(
        'Certificate not found. This record could not be verified.',
      );
    }

    // Log successful lookups to aid debugging in dev
    // eslint-disable-next-line no-console
    console.log(`Verification found: ${verification_id}`);
    return typed.data;
  }

  async findAll(opts?: { q?: string; page?: number; pageSize?: number }) {
    const q = opts?.q?.trim();
    const page = opts?.page ?? 1;
    const pageSize = opts?.pageSize ?? 10;

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const res = await retryWithBackoff(
      async () => {
        let builder: any = this.supabase.adminClient
          .from('verification_records')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false });

        if (q) {
          // Search across several text fields using ilike
          const like = `%${q}%`;
          builder = builder.or(
            `name.ilike.${like},student_id.ilike.${like},verification_id.ilike.${like},course_completed.ilike.${like}`,
          );
        }

        builder = builder.range(from, to);
        return await builder;
      },
      3,
      500,
    );

    const typed = res as {
      data: VerificationRecord[] | null;
      error?: unknown;
      count?: number;
    };

    if (typed.error) {
      console.error('Supabase findAll error:', typed.error);
      throw new InternalServerErrorException('Failed to fetch records');
    }

    const data = typed.data ?? [];
    const total = typeof typed.count === 'number' ? typed.count : data.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      data,
      meta: { total, page, pageSize, totalPages },
    };
  }

  async update(verification_id: string, dto: Partial<CreateVerificationDto>) {
    // Prevent updating to invalid sizes for text fields
    if (dto.course_information) {
      const courseWords = this.countWords(dto.course_information as string);
      if (courseWords > 500) {
        throw new BadRequestException(
          `course_information exceeds 500 words (current: ${courseWords})`,
        );
      }
    }

    if (dto.modules_completed) {
      // Validate modules array
      if (!Array.isArray(dto.modules_completed) || dto.modules_completed.length === 0) {
        throw new BadRequestException(
          'modules_completed must be a non-empty array',
        );
      }
    }

    console.log('Update request - attempting with retry:', { verification_id });

    const res = await retryWithBackoff(
      async () => {
        const result = await this.supabase.adminClient
          .from('verification_records')
          .update(dto)
          .eq('verification_id', verification_id)
          .select()
          .single();
        return result;
      },
      3,
      500,
    );

    const typed = res as { data: VerificationRecord | null; error?: unknown };

    if (typed.error) {
      console.error('Supabase update error:', typed.error);
      throw new InternalServerErrorException('Failed to update record');
    }

    if (!typed.data) {
      throw new NotFoundException('Record not found');
    }

    console.log('Update successful:', { verification_id });
    return typed.data;
  }

  async remove(verification_id: string) {
    console.log('Delete request - attempting with retry:', { verification_id });

    const res = await retryWithBackoff(
      async () => {
        return await this.supabase.adminClient
          .from('verification_records')
          .delete()
          .eq('verification_id', verification_id)
          .select()
          .single();
      },
      3,
      500,
    );

    const typed = res as { data: VerificationRecord | null; error?: unknown };

    if (typed.error) {
      console.error('Supabase delete error:', typed.error);
      throw new InternalServerErrorException('Failed to delete record');
    }

    if (!typed.data) {
      throw new NotFoundException('Record not found');
    }

    console.log('Delete successful:', { verification_id });
    return { success: true, deleted: typed.data };
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { VerificationService } from './verification.service';
import { Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

type VerificationRecord = CreateVerificationDto & {
  id: string;
  verification_id: string;
  created_at: string;
};

@Controller('verifications')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  // Admin only — create a new verification record
  @Post()
  @UseGuards(SupabaseAuthGuard)
  create(@Body() dto: CreateVerificationDto, @Req() req?: Request) {
    // Build a frontend base from the incoming request when available so QR links
    // point to the currently-running frontend (works in dev across ports).
    // Prefer an explicit env override, otherwise use the browser's Origin header
    // (sent on fetch requests) to point the QR link at the running frontend.
    // Fall back to the request host if nothing else is available.
    const frontendBase =
      process.env.FRONTEND_URL ||
      req?.get('origin') ||
      (req ? `${req.protocol}://${req.get('host')}` : undefined);
    return this.verificationService.create(dto, frontendBase);
  }

  // Admin only — list all records with optional search + pagination
  @Get()
  @UseGuards(SupabaseAuthGuard)
  findAll(
    @Query('q') q?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const p = page ? Math.max(1, Number(page) || 1) : 1;

    const ps = pageSize
      ? Math.max(1, Math.min(100, Number(pageSize) || 10))
      : 10;
    return this.verificationService.findAll({ q, page: p, pageSize: ps });
  }

  // Public — verify by ID (rate limited to 30 req/min)
  @Get(':id')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async findOne(@Param('id') id: string): Promise<VerificationRecord> {
    // Log each incoming lookup to help trace requests (dev only)
    console.log(`Verification lookup requested id=${String(id)}`);
    try {
      return this.verificationService.findByVerificationId(id);
    } catch (err) {
      // Log details for debugging and rethrow so Nest handles the response
      console.error(`Verification lookup failed for id=${String(id)}`, err);
      throw err;
    }
  }

  // Dev helper: create a test record without auth to make quick local tests easier
  @Get('test/create')
  async createTest() {
    if (process.env.NODE_ENV === 'production') {
      return { error: 'Not allowed in production' };
    }

    const sample: CreateVerificationDto = {
      name: 'Test Student',
      student_id: 'TEST-0001',
      course_completed: 'Sample Course',
      date_of_completion: '240101',
      email: 'test@example.com',
      total_study_time: '0100',
      final_assessment_score: 85,
      cpd_hours_completed: 2,
      course_information: 'This is a sample course used for testing.',
      modules_completed: 'Module 1, Module 2',
    };

    const frontendBase = process.env.FRONTEND_URL || undefined;
    return this.verificationService.create(sample, frontendBase);
  }

  // Admin only — update a record
  @Patch(':id')
  @UseGuards(SupabaseAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateVerificationDto) {
    return this.verificationService.update(id, dto);
  }

  // Admin only — delete a record
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  remove(@Param('id') id: string) {
    return this.verificationService.remove(id);
  }
}

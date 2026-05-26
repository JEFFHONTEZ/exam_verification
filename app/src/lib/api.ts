import { getRefreshTokenFromCookie, setTokenCookie } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = API_URL ? API_URL : '';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }
}

function ensureApiBase() {
  if (!API_BASE) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not set. Set NEXT_PUBLIC_API_URL to your backend API base URL (e.g. http://localhost:3001)',
    );
  }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string) {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Sign up failed');
  return data;
}

export async function signIn(email: string, password: string) {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export async function signOut(token: string) {
  ensureApiBase();
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Utility function to refresh access token using refresh token
// In this case, since we're using Supabase JWT, we would need to call Supabase directly
// For now, we'll return null to indicate refresh failed, which will trigger logout
export function getRefreshToken(): string {
  if (typeof document === 'undefined') return '';
  return getRefreshTokenFromCookie();
}

export function updateAccessToken(newToken: string): void {
  if (typeof document === 'undefined') return;
  setTokenCookie(newToken);
}

// ─── Verifications ───────────────────────────────────────────────────────────

export interface CreateVerificationPayload {
  name: string;
  studentId: string;
  courseCompleted: string;
  dateOfCompletion: string;
  email: string;
  totalStudyTime: string;
  finalAssessmentScore: number;
  cpdHoursCompleted: number;
  courseInformation: string;
  modulesCompleted: string[];
}

interface RawApiRecord {
  [key: string]: unknown;
}

export interface VerificationRecord {
  verificationId: string;
  name: string;
  studentId: string;
  courseCompleted: string;
  dateOfCompletion: string;
  email: string;
  totalStudyTime: string;
  finalAssessmentScore: number;
  cpdHoursCompleted: number;
  courseInformation: string;
  modulesCompleted: string;
  createdAt: string;
}

function mapRecord(raw: RawApiRecord | null | undefined): VerificationRecord | null {
  if (!raw) return null;
  return {
    verificationId: String(raw.verification_id ?? raw.verificationId ?? ''),
    name: String(raw.name ?? raw.full_name ?? ''),
    studentId: String(raw.student_id ?? raw.studentId ?? ''),
    courseCompleted: String(raw.course_completed ?? raw.courseCompleted ?? ''),
    dateOfCompletion: String(raw.date_of_completion ?? raw.dateOfCompletion ?? ''),
    email: String(raw.email ?? ''),
    totalStudyTime: String(raw.total_study_time ?? raw.totalStudyTime ?? ''),
    finalAssessmentScore: Number(raw.final_assessment_score ?? raw.finalAssessmentScore ?? 0),
    cpdHoursCompleted: Number(raw.cpd_hours_completed ?? raw.cpdHoursCompleted ?? 0),
    courseInformation: String(raw.course_information ?? raw.courseInformation ?? ''),
    modulesCompleted: String(raw.modules_completed ?? raw.modulesCompleted ?? ''),
    createdAt: String(raw.created_at ?? raw.createdAt ?? ''),
  };
}

export async function createVerification(data: CreateVerificationPayload, token: string) {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/verifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to create record');

  return {
    verificationId: result.verification_id ?? result.verificationId,
    verificationUrl: result.verification_url ?? result.verificationUrl,
    qrCodeDataUrl: result.qrCodeDataUrl ?? result.qr_code_data_url ?? null,
    record: mapRecord(result.record ?? result.data ?? null),
  };
}

export async function getVerification(id: string) {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/verifications/${id}`, {
    cache: 'no-store',
  });
  let raw: RawApiRecord | null = null;
  try {
    raw = await res.json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    const message = raw?.message ?? raw?.error ?? (typeof raw === 'string' ? raw : null) ?? `Request failed with status ${res.status}`;
    return { error: String(message), status: res.status, raw };
  }

  return mapRecord(raw);
}

export async function listVerifications(
  token: string,
  opts?: { q?: string; page?: number; pageSize?: number },
) {
  ensureApiBase();
  const params = new URLSearchParams();
  if (opts?.q) params.set('q', opts.q);
  if (opts?.page) params.set('page', String(opts.page));
  if (opts?.pageSize) params.set('pageSize', String(opts.pageSize));

  const url = `${API_BASE}/api/verifications${params.toString() ? `?${params.toString()}` : ''}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    // network error (CORS, connection refused, etc.)
    console.error('listVerifications network error', { url, err });
    throw new ApiError(0, `Network error fetching records: ${String(err)}`);
  }

  if (res.ok) return res.json();

  // try to read response body for debugging
  let body: string;
  let data: unknown;
  try {
    data = await res.json();
    body = JSON.stringify(data);
  } catch {
    try {
      body = await res.text();
    } catch {
      body = '<unable to read body>';
    }
  }
  
  console.error('listVerifications failed', { url, status: res.status, body });
  
  const errorMessage = (data as RawApiRecord)?.message || (data as RawApiRecord)?.error || `Failed to fetch records`;
  throw new ApiError(res.status, String(errorMessage), data);
}

export async function updateVerification(id: string, data: Partial<CreateVerificationPayload>, token: string): Promise<RawApiRecord> {
  ensureApiBase();
  
  if (!token) {
    throw new ApiError(401, 'No authentication token found. Please log in again.');
  }
  
  // Transform camelCase keys to snake_case for API compatibility
  const transformed = {
    ...(data.name !== undefined && { name: data.name }),
    ...(data.studentId !== undefined && { student_id: data.studentId }),
    ...(data.courseCompleted !== undefined && { course_completed: data.courseCompleted }),
    ...(data.dateOfCompletion !== undefined && { date_of_completion: data.dateOfCompletion }),
    ...(data.email !== undefined && { email: data.email }),
    ...(data.totalStudyTime !== undefined && { total_study_time: data.totalStudyTime }),
    ...(data.finalAssessmentScore !== undefined && { final_assessment_score: data.finalAssessmentScore }),
    ...(data.cpdHoursCompleted !== undefined && { cpd_hours_completed: data.cpdHoursCompleted }),
    ...(data.courseInformation !== undefined && { course_information: data.courseInformation }),
    ...(data.modulesCompleted !== undefined && { 
      modules_completed: Array.isArray(data.modulesCompleted) 
        ? data.modulesCompleted 
        : typeof data.modulesCompleted === 'string'
          ? (() => {
              try {
                const parsed = JSON.parse(data.modulesCompleted);
                return Array.isArray(parsed) ? parsed : [data.modulesCompleted];
              } catch {
                return [data.modulesCompleted];
              }
            })()
          : []
    }),
  };
  
  console.log('Updating record:', { 
    id, 
    transformed: { ...transformed, modules_completed: JSON.stringify(transformed.modules_completed) },
    hasToken: !!token 
  });
  
  const res = await fetch(`${API_BASE}/api/verifications/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transformed),
  });
  
  let dataResp: RawApiRecord;
  try {
    dataResp = await res.json();
  } catch {
    throw new ApiError(res.status, 'Failed to parse response');
  }
  
  if (!res.ok) {
    const errorMessage = dataResp?.message || 'Failed to update record';
    console.error('Update failed:', { status: res.status, error: errorMessage });
    throw new ApiError(res.status, String(errorMessage), dataResp);
  }
  
  console.log('Update successful:', dataResp);
  return dataResp;
}

export async function deleteVerification(id: string, token: string): Promise<RawApiRecord> {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/verifications/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  
  let data: RawApiRecord;
  try {
    data = await res.json();
  } catch {
    throw new ApiError(res.status, 'Failed to parse response');
  }
  
  if (!res.ok) {
    const errorMessage = data?.message || 'Failed to delete record';
    throw new ApiError(res.status, String(errorMessage), data);
  }
  return data;
}
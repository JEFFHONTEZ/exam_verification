const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = API_URL ? API_URL : '';

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
  modulesCompleted: string;
}
function mapRecord(raw: any) {
  if (!raw) return null;
  return {
    verificationId: raw.verification_id ?? raw.verificationId,
    name: raw.name ?? raw.full_name ?? null,
    studentId: raw.student_id ?? raw.studentId ?? null,
    courseCompleted: raw.course_completed ?? raw.courseCompleted ?? null,
    dateOfCompletion: raw.date_of_completion ?? raw.dateOfCompletion ?? null,
    email: raw.email ?? null,
    totalStudyTime: raw.total_study_time ?? raw.totalStudyTime ?? null,
    finalAssessmentScore: raw.final_assessment_score ?? raw.finalAssessmentScore ?? null,
    cpdHoursCompleted: raw.cpd_hours_completed ?? raw.cpdHoursCompleted ?? null,
    courseInformation: raw.course_information ?? raw.courseInformation ?? null,
    modulesCompleted: raw.modules_completed ?? raw.modulesCompleted ?? null,
    createdAt: raw.created_at ?? raw.createdAt ?? null,
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
  let raw: any = null;
  try {
    raw = await res.json();
  } catch (e) {
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
    // eslint-disable-next-line no-console
    console.error('listVerifications network error', { url, err });
    throw new Error(`Network error fetching records: ${String(err)}`);
  }

  if (res.ok) return res.json();

  // try to read response body for debugging
  let body: string;
  try {
    body = await res.text();
  } catch (e) {
    body = '<unable to read body>';
  }
  // log details to help debug in browser console
  // eslint-disable-next-line no-console
  console.error('listVerifications failed', { url, status: res.status, body });
  throw new Error(`Failed to fetch records: ${res.status} ${body}`);
}

export async function updateVerification(id: string, data: Partial<CreateVerificationPayload>, token: string) {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/verifications/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to update record');
  return result;
}

export async function deleteVerification(id: string, token: string) {
  ensureApiBase();
  const res = await fetch(`${API_BASE}/api/verifications/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to delete record');
  return result;
}
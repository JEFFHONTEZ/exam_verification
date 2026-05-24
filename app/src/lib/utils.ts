// Format DDMMYY → DD/MM/YY
export function formatDate(ddmmyy: string): string {
  if (!ddmmyy || ddmmyy.length !== 6) return ddmmyy;
  return `${ddmmyy.slice(0, 2)}/${ddmmyy.slice(2, 4)}/${ddmmyy.slice(4)}`;
}

// Format HHMM → Xh Ym
export function formatStudyTime(hhmm: string): string {
  if (!hhmm || hhmm.length !== 4) return hhmm;
  const hours = parseInt(hhmm.slice(0, 2), 10);
  const mins = parseInt(hhmm.slice(2, 4), 10);
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Count words in a string
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Read the admin_token cookie (client-side only)
export function getTokenFromCookie(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

// Set the admin_token cookie (8h expiry)
export function setTokenCookie(token: string): void {
  document.cookie = `admin_token=${encodeURIComponent(token)}; path=/; max-age=${8 * 60 * 60}; SameSite=Strict`;
}

// Remove the admin_token cookie
export function clearTokenCookie(): void {
  document.cookie = 'admin_token=; path=/; max-age=0';
}
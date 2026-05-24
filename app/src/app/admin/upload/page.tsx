'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VerificationForm from '@/components/VerificationForm';
import { signOut } from '@/lib/api';
import { getTokenFromCookie, clearTokenCookie } from '@/lib/utils';

export default function AdminUploadPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    // Reading the token and setting state on mount is intentional here.
    const t = getTokenFromCookie();
    if (!t) {
      router.replace('/admin/login');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(t);
    }
  }, [router]);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await signOut(token);
    } catch {
      // ignore — still clear the cookie
    } finally {
      clearTokenCookie();
      router.replace('/admin/login');
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            Verification Records
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Create a new student certificate
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/records" className="text-sm text-blue-600 hover:underline">Records</Link>
          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="text-xs text-gray-500 hover:text-red-500 disabled:opacity-50 transition"
          >
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <VerificationForm token={token} />
        </div>
      </main>
    </div>
  );
}
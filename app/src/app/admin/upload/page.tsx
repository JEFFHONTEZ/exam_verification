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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create Verification Record</h1>
            <p className="text-sm text-gray-600 mt-1">Add a new student certificate</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/records" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
              Records
            </Link>
            <button
              onClick={handleLogout}
              disabled={signingOut}
              className="text-sm text-gray-600 hover:text-red-600 disabled:opacity-50 transition"
            >
              {signingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <VerificationForm token={token} />
        </div>
      </main>
    </div>
  );
}
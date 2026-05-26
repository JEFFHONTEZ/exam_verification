'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  listVerifications,
  updateVerification,
  deleteVerification,
  CreateVerificationPayload,
  ApiError,
} from '@/lib/api';
import { getTokenFromCookie, clearTokenCookie } from '@/lib/utils';
import { signOut } from '@/lib/api';
import EditModal from '@/components/AdminEditModal';

type VerificationRecord = {
  verification_id: string;
  name: string;
  student_id: string;
  course_completed: string;
  date_of_completion?: string;
  email?: string;
  total_study_time?: string;
  final_assessment_score?: number;
  cpd_hours_completed?: number;
  course_information?: string;
  modules_completed?: string[] | string;
  created_at?: string;
};

export default function AdminRecordsPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [records, setRecords] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<VerificationRecord | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = getTokenFromCookie();
    if (!t) return router.replace('/admin/login');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await listVerifications(token, { q: search || undefined, page, pageSize });
        setRecords(res.data || []);
        setTotal(res.meta?.total ?? (res.data ? res.data.length : 0));
      } catch (err) {
        if (err instanceof ApiError && err.isUnauthorized()) {
          clearTokenCookie();
          router.replace('/admin/login');
        } else if (err instanceof ApiError) {
          setError(`Error: ${err.message}`);
          console.error(err);
        } else {
          setError('Failed to load records');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [token, page, pageSize, search, router]);

  const handleEdit = (rec: VerificationRecord) => setEditing(rec);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this record? This cannot be undone.')) return;
    try {
      setError(null);
      await deleteVerification(id, token);
      setRecords((r: VerificationRecord[]) => r.filter((x) => x.verification_id !== id));
    } catch (err) {
      if (err instanceof ApiError && err.isUnauthorized()) {
        clearTokenCookie();
        router.replace('/admin/login');
      } else if (err instanceof ApiError) {
        setError(`Delete failed: ${err.message}`);
        alert(`Failed to delete: ${err.message}`);
      } else {
        setError('Failed to delete record');
        alert('Failed to delete');
      }
      console.error(err);
    }
  };

  const handleSave = async (id: string, updates: Partial<CreateVerificationPayload>) => {
    try {
      setError(null);
      const updated = await updateVerification(id, updates, token);
      setRecords((r: VerificationRecord[]): VerificationRecord[] => r.map((x: VerificationRecord) => (x.verification_id === id ? (updated as VerificationRecord) : x)));
      setEditing(null);
    } catch (err) {
      if (err instanceof ApiError && err.isUnauthorized()) {
        setError('Your session has expired. Please log in again.');
        clearTokenCookie();
        setTimeout(() => router.replace('/admin/login'), 2000);
      } else if (err instanceof ApiError) {
        const errorMsg = err.message || 'Failed to update record';
        setError(`Update failed: ${errorMsg}`);
        alert(`Failed to update: ${errorMsg}`);
      } else {
        setError('Failed to update record');
        alert('Failed to update');
      }
      console.error('Save error:', err);
    }
  };

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

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paginated = records;

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Verification Records</h1>
            <p className="text-sm text-gray-600 mt-1">Manage existing student certificates</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/upload" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
              + New Record
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

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, student ID, or verification ID..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 ml-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 text-sm">Loading records...</p>
              </div>
            </div>
          ) : records.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 text-sm">No records found</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Student ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginated.map((r) => (
                      <tr key={r.verification_id} className="hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-xs font-mono text-gray-600">{r.verification_id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.student_id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.course_completed}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.final_assessment_score}%</td>
                        <td className="px-6 py-4 text-sm space-x-3">
                          <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 font-medium transition">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(r.verification_id)} className="text-red-600 hover:text-red-800 font-medium transition">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{records.length}</span> of <span className="font-semibold">{total}</span> records
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← Prev
                  </button>
                  <div className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white">
                    {page} / {totalPages}
                  </div>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {editing && (
        <EditModal
          record={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

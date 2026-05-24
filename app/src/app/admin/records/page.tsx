'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  listVerifications,
  updateVerification,
  deleteVerification,
  CreateVerificationPayload,
} from '@/lib/api';
import { getTokenFromCookie } from '@/lib/utils';
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
  modules_completed?: string;
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

  useEffect(() => {
    const t = getTokenFromCookie();
    if (!t) return router.replace('/admin/login');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    (async () => {
      try {
        const res = await listVerifications(token, { q: search || undefined, page, pageSize });
        setRecords(res.data || []);
        setTotal(res.meta?.total ?? (res.data ? res.data.length : 0));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, page, pageSize, search]);

  const handleEdit = (rec: VerificationRecord) => setEditing(rec);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this record? This cannot be undone.')) return;
    try {
      await deleteVerification(id, token);
      setRecords((r) => r.filter((x) => x.verification_id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  const handleSave = async (id: string, updates: Partial<CreateVerificationPayload>) => {
    try {
      const updated = await updateVerification(id, updates, token);
      setRecords((r) => r.map((x) => (x.verification_id === id ? updated : x)));
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update');
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paginated = records;

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Verification Records</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage existing records</p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, student ID, or verification ID"
            className="text-sm border rounded px-3 py-2"
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Student ID</th>
                    <th className="py-2">Course</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((r) => (
                    <tr key={r.verification_id} className="border-t">
                      <td className="py-2 text-xs text-gray-500">{r.verification_id}</td>
                      <td className="py-2">{r.name}</td>
                      <td className="py-2">{r.student_id}</td>
                      <td className="py-2">{r.course_completed}</td>
                      <td className="py-2">
                        <button onClick={() => handleEdit(r)} className="text-sm text-blue-600 mr-3">Edit</button>
                        <button onClick={() => handleDelete(r.verification_id)} className="text-sm text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">{total} records</div>
                <div className="flex gap-2">
                  <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                  <div className="px-3 py-1 border rounded">{page} / {totalPages}</div>
                  <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
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

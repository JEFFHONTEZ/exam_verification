'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { CreateVerificationPayload } from '@/lib/api';

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
};

interface Props {
  record: VerificationRecord;
  onClose: () => void;
  onSave: (id: string, updates: Partial<CreateVerificationPayload>) => void;
}

export default function EditModal({ record, onClose, onSave }: Props) {
  const [form, setForm] = useState(() => ({
    name: record.name || '',
    studentId: record.student_id || '',
    courseCompleted: record.course_completed || '',
    dateOfCompletion: record.date_of_completion || '',
    email: record.email || '',
    totalStudyTime: record.total_study_time || '',
    finalAssessmentScore: record.final_assessment_score ?? 0,
    cpdHoursCompleted: record.cpd_hours_completed ?? 0,
    courseInformation: record.course_information || '',
    modulesCompleted: record.modules_completed || '',
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: Partial<CreateVerificationPayload> = {
      name: form.name,
      studentId: form.studentId,
      courseCompleted: form.courseCompleted,
      dateOfCompletion: form.dateOfCompletion,
      email: form.email,
      totalStudyTime: form.totalStudyTime,
      finalAssessmentScore: Number(form.finalAssessmentScore),
      cpdHoursCompleted: Number(form.cpdHoursCompleted),
      courseInformation: form.courseInformation,
      modulesCompleted: form.modulesCompleted,
    };

    onSave(record.verification_id, payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Record</h2>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="border p-2 rounded" />
            <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student ID" className="border p-2 rounded" />
            <input name="courseCompleted" value={form.courseCompleted} onChange={handleChange} placeholder="Course" className="border p-2 rounded" />
            <input name="dateOfCompletion" value={form.dateOfCompletion} onChange={handleChange} placeholder="DDMMYY" className="border p-2 rounded" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
            <input name="totalStudyTime" value={form.totalStudyTime} onChange={handleChange} placeholder="HHMM" className="border p-2 rounded" />
            <input name="finalAssessmentScore" value={String(form.finalAssessmentScore)} onChange={handleChange} placeholder="Score" className="border p-2 rounded" />
            <input name="cpdHoursCompleted" value={String(form.cpdHoursCompleted)} onChange={handleChange} placeholder="CPD hours" className="border p-2 rounded" />
          </div>

          <textarea name="courseInformation" value={form.courseInformation} onChange={handleChange} placeholder="Course information" className="w-full border p-2 rounded" rows={4} />
          <textarea name="modulesCompleted" value={form.modulesCompleted} onChange={handleChange} placeholder="Modules completed" className="w-full border p-2 rounded" rows={2} />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

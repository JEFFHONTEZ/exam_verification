'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateVerificationPayload } from '@/lib/api';
import TagInput from './TagInput';

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
};

interface Props {
  record: VerificationRecord;
  onClose: () => void;
  onSave: (id: string, updates: Partial<CreateVerificationPayload>) => void;
}

const schema = z.object({
  name: z.string().min(1, 'Full name is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  courseCompleted: z.string().min(1, 'Course name is required'),
  dateOfCompletion: z.string().optional(),
  email: z.string().email().optional(),
  totalStudyTime: z.string().optional(),
  finalAssessmentScore: z.number().min(0).max(100),
  cpdHoursCompleted: z.number().min(0),
  courseInformation: z.string().optional(),
  modulesCompleted: z.array(z.string()).min(1, 'At least one module is required'),
});

type FormValues = z.infer<typeof schema>;

export default function EditModal({ record, onClose, onSave }: Props) {
  const [saving, setSaving] = useState(false);

  // Convert modules_completed to array if it's a string
  const modulesArray = Array.isArray(record.modules_completed)
    ? record.modules_completed
    : typeof record.modules_completed === 'string'
      ? (() => {
          try {
            // Try to parse as JSON array first
            const parsed = JSON.parse(record.modules_completed);
            return Array.isArray(parsed) ? parsed : [record.modules_completed];
          } catch {
            // Fall back to comma/newline split for plain text
            return record.modules_completed
              .split(/[,\n]/)
              .map((m) => m.trim())
              .filter(Boolean);
          }
        })()
      : [];

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: record.name,
      studentId: record.student_id,
      courseCompleted: record.course_completed,
      dateOfCompletion: record.date_of_completion || '',
      email: record.email || '',
      totalStudyTime: record.total_study_time || '',
      finalAssessmentScore: record.final_assessment_score ?? 0,
      cpdHoursCompleted: record.cpd_hours_completed ?? 0,
      courseInformation: record.course_information || '',
      modulesCompleted: modulesArray,
    },
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    try {
      const payload: Partial<CreateVerificationPayload> = {
        name: data.name,
        studentId: data.studentId,
        courseCompleted: data.courseCompleted,
        dateOfCompletion: data.dateOfCompletion,
        email: data.email,
        totalStudyTime: data.totalStudyTime,
        finalAssessmentScore: data.finalAssessmentScore,
        cpdHoursCompleted: data.cpdHoursCompleted,
        courseInformation: data.courseInformation,
        modulesCompleted: data.modulesCompleted,
      };

      onSave(record.verification_id, payload);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Edit Record</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Grid of inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Full Name</label>
                <input
                  {...register('name')}
                  className={`px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 transition ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-300'
                  }`}
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>

              {/* Student ID */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Student ID</label>
                <input
                  {...register('studentId')}
                  className={`px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 transition ${
                    errors.studentId
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-300'
                  }`}
                />
                {errors.studentId && <span className="text-xs text-red-500">{errors.studentId.message}</span>}
              </div>

              {/* Course */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Course Completed</label>
                <input
                  {...register('courseCompleted')}
                  className={`px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 transition ${
                    errors.courseCompleted
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-300'
                  }`}
                />
                {errors.courseCompleted && (
                  <span className="text-xs text-red-500">{errors.courseCompleted.message}</span>
                )}
              </div>

              {/* Date of Completion */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Date (DDMMYY)</label>
                <input
                  {...register('dateOfCompletion')}
                  maxLength={6}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              {/* Study Time */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Study Time (HHMM)</label>
                <input
                  {...register('totalStudyTime')}
                  maxLength={4}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              {/* Assessment Score */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Assessment Score (%)</label>
                <input
                  {...register('finalAssessmentScore', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  max={100}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              {/* CPD Hours */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">CPD Hours</label>
                <input
                  {...register('cpdHoursCompleted', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
            </div>

            {/* Course Information */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-900">Course Information</label>
              <textarea
                {...register('courseInformation')}
                rows={4}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
              />
            </div>

            {/* Modules */}
            <TagInput
              name="modulesCompleted"
              label="Modules Completed"
              placeholder="Enter module name and press Enter"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

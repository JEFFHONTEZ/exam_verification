'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createVerification } from '@/lib/api';
import WordCountTextarea from './WordCountTextarea';

const schema = z.object({
  name: z.string().min(1, 'Full name is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  courseCompleted: z.string().min(1, 'Course name is required'),
  dateOfCompletion: z
    .string()
    .regex(/^\d{6}$/, 'Must be DDMMYY format — e.g. 230526'),
  email: z.string().email('Enter a valid email address'),
  totalStudyTime: z
    .string()
    .regex(/^\d{4}$/, 'Must be HHMM format — e.g. 0430'),
  finalAssessmentScore: z
    .string()
    .regex(/^\d+$/, 'Enter a number')
    .refine((v) => Number(v) >= 0 && Number(v) <= 100, 'Must be 0–100'),
  cpdHoursCompleted: z
    .string()
    .regex(/^\d+$/, 'Enter a number')
    .refine((v) => Number(v) >= 0, 'Must be 0 or more'),
  courseInformation: z
    .string()
    .min(1, 'Course information is required')
    .refine(
      (v) => v.trim().split(/\s+/).filter(Boolean).length <= 500,
      'Maximum 500 words',
    ),
  modulesCompleted: z
    .string()
    .min(1, 'Modules completed is required')
    .refine(
      (v) => v.trim().split(/\s+/).filter(Boolean).length <= 30,
      'Maximum 30 words',
    ),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  token: string;
}

interface QrResult {
  verificationId: string;
  verificationUrl: string;
  qrCodeDataUrl: string;
}

export default function VerificationForm({ token }: Props) {
  const [qrResult, setQrResult] = useState<QrResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      studentId: '',
      courseCompleted: '',
      dateOfCompletion: '',
      email: '',
      totalStudyTime: '',
      finalAssessmentScore: '',
      cpdHoursCompleted: '',
      courseInformation: '',
      modulesCompleted: '',
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = methods;

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setError('');
    try {
      const result = await createVerification(
        {
          ...data,
          finalAssessmentScore: Number(data.finalAssessmentScore),
          cpdHoursCompleted: Number(data.cpdHoursCompleted),
        },
        token,
      );
      setQrResult(result);
      reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (qrResult) {
    return (
      <div className="max-w-lg mx-auto text-center py-10">
        <div className="mb-4 text-green-600">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Record Created
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Verification ID: <code className="bg-gray-100 px-1 rounded">{qrResult.verificationId}</code>
        </p>

        <div className="border rounded-xl p-6 bg-white shadow-sm mb-6">
          <img
            src={qrResult.qrCodeDataUrl}
            alt="Verification QR Code"
            className="mx-auto mb-4"
            style={{ width: 200, height: 200 }}
          />
          <p className="text-xs text-gray-400 mb-4 break-all">
            {qrResult.verificationUrl}
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={qrResult.qrCodeDataUrl}
              download={`cert-${qrResult.verificationId}.png`}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Download QR
            </a>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(qrResult.verificationUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                } catch (e) {
                  // ignore clipboard errors
                }
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={() => setQrResult(null)}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
            >
              New Record
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register('name')}
              placeholder="Jane Doe"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          {/* Student ID */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Student ID</label>
            <input
              {...register('studentId')}
              placeholder="STU-2024-001"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.studentId ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.studentId && <span className="text-xs text-red-500">{errors.studentId.message}</span>}
          </div>

          {/* Course Completed */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Course Completed</label>
            <input
              {...register('courseCompleted')}
              placeholder="Digital Marketing"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.courseCompleted ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.courseCompleted && <span className="text-xs text-red-500">{errors.courseCompleted.message}</span>}
          </div>

          {/* Date of Completion */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Date of Completion</label>
            <input
              {...register('dateOfCompletion')}
              placeholder="230526 (DDMMYY)"
              maxLength={6}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.dateOfCompletion ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.dateOfCompletion && <span className="text-xs text-red-500">{errors.dateOfCompletion.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="jane@example.com"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>

          {/* Total Study Time */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Total Study Time</label>
            <input
              {...register('totalStudyTime')}
              placeholder="0430 (HHMM)"
              maxLength={4}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.totalStudyTime ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.totalStudyTime && <span className="text-xs text-red-500">{errors.totalStudyTime.message}</span>}
          </div>

          {/* Final Assessment Score */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Final Assessment Score (%)</label>
            <input
              {...register('finalAssessmentScore')}
              type="number"
              min={0}
              max={100}
              placeholder="88"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.finalAssessmentScore ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.finalAssessmentScore && <span className="text-xs text-red-500">{errors.finalAssessmentScore.message}</span>}
          </div>

          {/* CPD Hours */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">CPD Hours Completed</label>
            <input
              {...register('cpdHoursCompleted')}
              type="number"
              min={0}
              placeholder="4"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.cpdHoursCompleted ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.cpdHoursCompleted && <span className="text-xs text-red-500">{errors.cpdHoursCompleted.message}</span>}
          </div>
        </div>

        {/* Course Information */}
        <WordCountTextarea
          name="courseInformation"
          label="Course Information"
          maxWords={500}
          rows={5}
          placeholder="Describe the course content, objectives, and outcomes..."
        />

        {/* Modules Completed */}
        <WordCountTextarea
          name="modulesCompleted"
          label="Modules Completed"
          maxWords={30}
          rows={2}
          placeholder="Module 1: Introduction, Module 2: Advanced..."
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? 'Generating record...' : 'Create Verification Record'}
        </button>
      </form>
    </FormProvider>
  );
}
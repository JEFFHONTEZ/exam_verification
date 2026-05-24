import { formatDate, formatStudyTime } from '@/lib/utils';

interface Record {
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

interface Props {
  record: Record;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}

export default function CertificateDisplay({ record }: Props) {
  // detect missing or null fields to provide helpful feedback
  const expectedKeys: Array<keyof Record> = [
    'verificationId','name','studentId','courseCompleted','dateOfCompletion','email','totalStudyTime','finalAssessmentScore','cpdHoursCompleted','courseInformation','modulesCompleted','createdAt',
  ];

  const missing = expectedKeys.filter((k) => record[k] === null || record[k] === undefined);
  return (
    <div className="max-w-2xl mx-auto">
      {/* Verified Banner */}
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6">
        <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-green-800">Certificate Verified</p>
          <p className="text-xs text-green-600">
            ID: {record.verificationId} · Issued{' '}
            {new Date(record.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Student Details */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-5">
          <h1 className="text-xl font-semibold text-white">{record.name}</h1>
          <p className="text-sm text-gray-400 mt-1">{record.courseCompleted}</p>
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-2 gap-6 px-6 py-5 border-b border-gray-100">
          <Field label="Student ID" value={record.studentId} />
          <Field label="Email" value={record.email} />
          <Field label="Date of Completion" value={formatDate(record.dateOfCompletion)} />
          <Field label="Total Study Time" value={formatStudyTime(record.totalStudyTime)} />
          <Field label="Final Assessment Score" value={`${record.finalAssessmentScore}%`} />
          <Field label="CPD Hours Completed" value={`${record.cpdHoursCompleted} hours`} />
        </div>

        {/* Course Information */}
        <div className="px-6 py-5 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
            Course Information
          </span>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {record.courseInformation}
          </p>
        </div>

        {/* Modules Completed */}
        <div className="px-6 py-5">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
            Modules Completed
          </span>
          <p className="text-sm text-gray-700">{record.modulesCompleted}</p>
        </div>
      </div>

      {/* Print hint */}
      {missing.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-yellow-800">Note: This record is missing some expected fields and may be incomplete.</p>
          <p className="text-xs text-yellow-700 mt-1">Missing: {missing.join(', ')}</p>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-6">
        Verified at {typeof window !== 'undefined' ? window.location.href : ''}
      </p>
    </div>
  );
}
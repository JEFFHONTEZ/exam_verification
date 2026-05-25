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
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-base text-gray-900">{value}</span>
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
    <div className="mx-auto">
      {/* Light blue hero panel like Alison */}
      <div className="alison-hero rounded-2xl p-6 md:p-8 mb-10 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dekilw4yx/image/upload/v1779669679/light-blue-hero-background_jx5k6o.png)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-3 md:mb-4">{record.name}</h2>

            <div className="space-y-3 text-slate-700 text-sm md:text-base">
              <div>
                <span className="font-semibold">Alison ID:</span>{' '}
                <span className="">{record.studentId}</span>
              </div>
              <div>
                <span className="font-semibold">Course Completed:</span>{' '}
                <span className="">{record.courseCompleted}</span>
              </div>
              <div>
                <span className="font-semibold">Date of Completion:</span>{' '}
                <span className="">{formatDate(record.dateOfCompletion)}</span>
              </div>
              <div>
                <span className="font-semibold">Email:</span>{' '}
                <span className="">{record.email}</span>
              </div>
              <div>
                <span className="font-semibold">Total Study Time:</span>{' '}
                <span className="">{formatStudyTime(record.totalStudyTime)}</span>
              </div>
            </div>

            {/* stat boxes */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <div className="sm:pr-4">
                  <div className="text-sm font-semibold">Final Assessment Score</div>
                  <div className="text-xs text-slate-500">Minimum 80% required to pass the final assessment</div>
                </div>
                <div className="mt-3 sm:mt-0 text-3xl sm:text-4xl font-extrabold text-slate-800">{record.finalAssessmentScore}%</div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <div className="sm:pr-4">
                  <div className="text-sm font-semibold">CPD Hours Completed</div>
                  <div className="text-xs text-slate-500">CPD approved learning hours completed through this course</div>
                </div>
                <div className="mt-3 sm:mt-0 text-3xl sm:text-4xl font-extrabold text-slate-800">{record.cpdHoursCompleted || '1-2'}</div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-end">
            {/* Illustration on the right (placeholder svg) */}
            <img src="/images/hero-illustration.svg" alt="illustration" className="w-28 h-28 md:w-36 md:h-36 object-contain" />
          </div>
        </div>
      </div>

      {/* Course Information section */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Course Information</h3>
        <p className="text-base text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{record.courseInformation}</p>

        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Modules Completed</h3>
        <div className="space-y-4">
          <p className="text-base text-slate-700">{record.modulesCompleted}</p>
        </div>
      </div>

      {/* Print hint */}
      {missing.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-8">
          <p className="text-xs text-yellow-800">Note: This record is missing some expected fields and may be incomplete.</p>
          <p className="text-xs text-yellow-700 mt-1">Missing: {missing.join(', ')}</p>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-6">Verified at {typeof window !== 'undefined' ? window.location.href : ''}</p>
    </div>
  );
}
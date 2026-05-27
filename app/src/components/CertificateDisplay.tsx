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

export default function CertificateDisplay({ record }: Props) {
  // detect missing or null fields to provide helpful feedback
  const expectedKeys: Array<keyof Record> = [
    'verificationId','name','studentId','courseCompleted','dateOfCompletion','email','totalStudyTime','finalAssessmentScore','cpdHoursCompleted','courseInformation','modulesCompleted','createdAt',
  ];

  const missing = expectedKeys.filter((k) => record[k] === null || record[k] === undefined);

  // Parse modules - handle both string and array formats
  const parseModules = (): string[] => {
    if (Array.isArray(record.modulesCompleted)) {
      return record.modulesCompleted;
    }
    if (typeof record.modulesCompleted === 'string') {
      // Try to parse as JSON first
      try {
        const parsed = JSON.parse(record.modulesCompleted);
        if (Array.isArray(parsed)) {
          return parsed.map(m => String(m).trim()).filter(Boolean);
        }
      } catch {
        // Not JSON, continue with string parsing
      }
      // Handle comma-separated or newline-separated modules
      return record.modulesCompleted
        .split(/[,\n\[\]"]/)
        .map((m) => m.trim())
        .filter(Boolean);
    }
    return [];
  };

  const modules = parseModules();

  return (
    <div className="mx-auto">
      {/* Light blue hero panel like Alison */}
      <div 
        className="rounded-2xl p-8 md:p-10 mb-10 bg-cover bg-center bg-no-repeat shadow-lg"
        style={{ 
          backgroundImage: 'url(https://res.cloudinary.com/dekilw4yx/image/upload/v1779669679/light-blue-hero-background_jx5k6o.png)',
          minHeight: '420px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
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
              <div className="rounded-xl bg-white border border-slate-300 p-4 flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="text-sm font-semibold text-slate-800">Final Assessment Score</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight">Alison courses requires at least 80% to pass the final assessment</div>
                </div>
                <div className="flex items-center">
                  <div className="w-px h-12 bg-slate-200 mr-4" />
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-800">{record.finalAssessmentScore}%</div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-slate-300 p-4 flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="text-sm font-semibold text-slate-800">CPD Hours Completed</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight">CPD approved learning hours completed through this course</div>
                </div>
                <div className="flex items-center">
                  <div className="w-px h-12 bg-slate-200 mr-4" />
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-800 whitespace-nowrap">{record.cpdHoursCompleted || '1-2h'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* right column reserved for badges/ratings in original design - keep empty for now to preserve layout */}
          <div className="hidden lg:flex lg:flex-col" />
        </div>
      </div>

      {/* Course Information section */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Course Information</h3>
        <p className="text-base text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{record.courseInformation}</p>

        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Modules Completed</h3>
        <div className="space-y-2">
          {modules.length > 0 ? (
            modules.map((module, idx) => (
              <p key={idx} className="text-base font-semibold text-slate-700">
                {module}
              </p>
            ))
          ) : (
            <p className="text-base text-slate-700">{record.modulesCompleted}</p>
          )}
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
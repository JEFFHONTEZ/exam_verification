import { getVerification } from '@/lib/api';
import CertificateDisplay from '@/components/CertificateDisplay';
import InvalidCertificate from '@/components/InvalidCertificate';

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <InvalidCertificate message="Missing verification id" />
        </div>
      </div>
    );
  }

  const recordOrError = await getVerification(id);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Certificate Verification
          </p>
        </div>

        {/* If the API returned an error object, render InvalidCertificate with details */}
        {recordOrError && (recordOrError as any).error ? (
          <InvalidCertificate message={(recordOrError as any).error} details={(recordOrError as any).raw} />
        ) : (
          // recordOrError will be the normalized record or null
          (recordOrError ? <CertificateDisplay record={recordOrError as any} /> : <InvalidCertificate />)
        )}
      </div>
    </div>
  );
}
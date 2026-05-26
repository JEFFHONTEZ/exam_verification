import { getVerification, VerificationRecord } from '@/lib/api';
import CertificateDisplay from '@/components/CertificateDisplay';
import InvalidCertificate from '@/components/InvalidCertificate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface VerificationError {
  error: string;
  status: number;
  raw: unknown;
}

type VerificationResult = VerificationRecord | VerificationError | null;

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex-1">
          <div className="max-w-2xl mx-auto">
            <InvalidCertificate message="Missing verification id" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const recordOrError = await getVerification(id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-50 py-10 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Page title and lead sentence - mirrors Alison's verify page */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">Your Learner Verification</h1>
            <p className="text-base text-slate-700">{
              recordOrError && !('error' in recordOrError) && recordOrError?.name
                ? `This is to verify that ${ recordOrError.name } has completed the course ${ recordOrError.courseCompleted } on Alison.`
                : 'This is to verify the details of the certificate.'
            }</p>
          </div>

          {/* If the API returned an error object, render InvalidCertificate with details */}
          {recordOrError && 'error' in recordOrError ? (
            <InvalidCertificate message={recordOrError.error} details={recordOrError.raw} />
          ) : recordOrError && !('error' in recordOrError) ? (
            <CertificateDisplay record={recordOrError} />
          ) : (
            <InvalidCertificate />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
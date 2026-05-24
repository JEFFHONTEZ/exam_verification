import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Exam Verification Portal
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Scan a QR code from a certificate to verify it, or sign in as admin.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Admin Login →
          </Link>
          <Link
            href="/admin/signup"
            className="text-sm text-gray-500 hover:underline"
          >
            Create Account →
          </Link>
        </div>
      </div>
    </div>
  );
}
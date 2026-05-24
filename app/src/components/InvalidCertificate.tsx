interface Props {
  message?: string;
  details?: any;
}

export default function InvalidCertificate({ message, details }: Props) {
  return (
    <div className="max-w-md mx-auto text-center py-6">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Certificate Not Found</h1>
      <p className="text-sm text-gray-500 mb-4">
        This record could not be verified. The certificate may be invalid,
        revoked, or the verification ID is incorrect.
      </p>

      {message && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 rounded-lg mb-3">
          <strong>Server:</strong> {message}
        </div>
      )}

      {details && (
        <details className="text-xs text-gray-500 text-left mx-auto max-w-prose">
          <summary className="cursor-pointer">Show response details (for debugging)</summary>
          <pre className="whitespace-pre-wrap mt-2">{JSON.stringify(details, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}
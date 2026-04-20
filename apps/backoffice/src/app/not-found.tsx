import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 max-w-md w-full">
        <div className="text-5xl font-bold text-gray-200 mb-4">404</div>

        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Page not found
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          The page you are looking for doesn&apos;t exist.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

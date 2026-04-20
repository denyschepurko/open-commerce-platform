"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function BackofficeError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 max-w-md w-full">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-400 mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => unstable_retry()}>
            Try again
          </Button>
          <Button variant="secondary" href="/dashboard">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

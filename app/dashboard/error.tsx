'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-xl font-semibold">Dashboard Error</h2>
      <p className="mt-2 text-gray-500">An error occurred while loading the dashboard.</p>
      <div className="mt-6 flex gap-4">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-100"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
} 
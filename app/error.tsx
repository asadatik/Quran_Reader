'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Home page error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Surahs</h1>
        <p className="text-gray-600 text-sm mb-6">
          {error?.message || 'Something went wrong while fetching the Quran data.'}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white
                       rounded-xl font-medium hover:bg-emerald-800 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200
                       text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        {/* Debug info */}
        {error?.digest && (
          <p className="text-xs text-gray-400 mt-6 break-all">
            Error ID: <code className="text-gray-500">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  );
}
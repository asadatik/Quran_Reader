'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Surah page error:', error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          All Surahs
        </Link>
      </div>

   
      <div className="text-center py-20">
  
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-red-100/80 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>


        <h1 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Surah</h1>
        <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">
          {error?.message ||
            'The Surah could not be loaded. This might be a temporary issue with the data source.'}
        </p>

     
        <div className="flex gap-3 justify-center flex-wrap">
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
            <ArrowLeft className="w-4 h-4" />
            Back to Surahs
          </Link>
        </div>

    
        {error?.digest && (
          <p className="text-xs text-gray-400 mt-8 break-all font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
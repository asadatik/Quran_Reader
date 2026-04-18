'use client';

import { Search, X } from 'lucide-react';
import { useRef } from 'react';

interface SearchBarProps {
  value:        string;
  onChange:     (value: string) => void;
  placeholder?: string;
  className?:   string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  className   = '',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative group ${className}`}>
      {/* Icon */}
      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8  
                   text-emerald-500 group-focus-within:text-emerald-600 transition-colors pointer-events-none"
      />

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full pl-10 pr-9 py-3 bg-white border border-emerald-400 rounded-xl shadow-sm 
                   text-gray-800 placeholder-gray-500 text-sm
                   focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-400
                   transition-all"
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                     hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
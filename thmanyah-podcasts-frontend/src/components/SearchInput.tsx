'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (term: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  isLoading = false,
  placeholder = "ابحث عن البودكاست...",
  autoFocus = false,
  className = ''
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative flex items-center transition-all duration-300 ${
        isFocused 
          ? 'ring-2 ring-thmanyah-400/50 shadow-lg shadow-thmanyah-100' 
          : 'shadow-soft hover:shadow-medium'
      }`}>
        {/* Search Icon */}
        <div className="absolute left-4 flex items-center">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                exit={{ scale: 0, rotate: -360 }}
                transition={{ duration: 0.3 }}
              >
                <Loader2 className="h-5 w-5 text-thmanyah-500 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ scale: 0, rotate: -360 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Search className="h-5 w-5 text-neutral-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-12 text-right text-lg font-medium text-neutral-900 placeholder-neutral-500 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
          dir="rtl"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {value && !isLoading && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 flex items-center justify-center rounded-full p-1 text-neutral-400 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Search Button */}
      <motion.button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl bg-thmanyah-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-thmanyah-600 hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-thmanyah-500"
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'بحث'
        )}
      </motion.button>
    </motion.form>
  );
}

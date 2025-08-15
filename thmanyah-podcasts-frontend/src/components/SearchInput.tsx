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
    <motion.div 
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        {/* Main Input Container */}
        <div className="relative">
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
            className={`
              w-full h-16 px-6 pr-16 text-lg font-medium text-neutral-900 placeholder-neutral-500 
              bg-white border-2 rounded-2xl shadow-lg transition-all duration-300 outline-none
              ${value.trim() ? 'pl-32' : 'pl-6'}
              ${isFocused 
                ? 'border-thmanyah-500 shadow-lg ring-2 ring-thmanyah-500/5' 
                : 'border-neutral-200 hover:border-neutral-300 hover:shadow-xl'
              }
              ${isLoading ? 'cursor-not-allowed opacity-60' : 'cursor-text'}
              dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-400
              dark:focus:border-thmanyah-400 dark:focus:ring-thmanyah-400/5
            `}
            dir="rtl"
          />

          {/* Search Icon - Right Side */}
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ 
              scale: isFocused ? 1.1 : 1,
              rotate: isFocused ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`
              p-2 rounded-xl transition-all duration-300
              ${isFocused 
                ? 'bg-thmanyah-500/10 text-thmanyah-600' 
                : 'text-neutral-500'
              }
            `}>
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-thmanyah-500" />
              ) : (
                <Search className="h-6 w-6" />
              )}
            </div>
          </motion.div>

          {/* Clear Button - Left Side Inner */}
          <AnimatePresence>
            {value && !isLoading && (
              <motion.button
                type="button"
                onClick={handleClear}
                className="absolute left-26 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-all duration-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-200 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Submit Button - Left Side Outer */}
          <AnimatePresence>
            {value.trim() && (
              <motion.button
                type="submit"
                disabled={isLoading}
                className="absolute left-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-thmanyah-500 to-thmanyah-600 hover:from-thmanyah-600 hover:to-thmanyah-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-thmanyah-500/50 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                initial={{ scale: 0, opacity: 0, x: 10 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-1.5">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  بحث
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-thmanyah-500 pointer-events-none -z-10"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ 
            opacity: isFocused ? 0.15 : 0,
            scale: isFocused ? 1 : 1.01
          }}
          transition={{ duration: 0.3 }}
        />
      </form>
    </motion.div>
  );
}

'use client';

import Link from 'next/link';
import { Search, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

interface HeaderProps {
  onSearchFocus?: () => void;
}

export default function Header({ onSearchFocus }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-900/80"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-thmanyah-500 to-thmanyah-600 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <Radio className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-thmanyah-400/50 to-thmanyah-600/50 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-thmanyah-600">
                بودكاست ثمانية
              </h1>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                اكتشف أفضل البودكاست
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-neutral-700 hover:text-thmanyah-600 dark:text-neutral-300 dark:hover:text-thmanyah-400 transition-colors duration-200"
            >
              الرئيسية
            </Link>
            <Link 
              href="/search" 
              className="text-sm font-medium text-neutral-700 hover:text-thmanyah-600 dark:text-neutral-300 dark:hover:text-thmanyah-400 transition-colors duration-200"
            >
              البحث
            </Link>
            <Link 
              href="/discover" 
              className="text-sm font-medium text-neutral-700 hover:text-thmanyah-600 dark:text-neutral-300 dark:hover:text-thmanyah-400 transition-colors duration-200"
            >
              استكشاف
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onSearchFocus}
              className="group flex items-center space-x-2 rounded-full border border-neutral-300 bg-neutral-50/50 px-4 py-2 text-sm text-neutral-600 backdrop-blur-sm transition-all duration-300 hover:border-thmanyah-300 hover:bg-thmanyah-50/50 hover:text-thmanyah-700 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:border-thmanyah-600 dark:hover:bg-thmanyah-900/20 dark:hover:text-thmanyah-300"
            >
              <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden sm:inline">البحث في البودكاست...</span>
            </button>

            {/* Mobile Navigation */}
            <Navigation />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

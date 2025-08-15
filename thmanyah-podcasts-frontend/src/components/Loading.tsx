'use client';

import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'spinner' | 'pulse' | 'wave';
}

export default function Loading({ 
  message = "جاري البحث...", 
  size = 'md',
  type = 'spinner' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (type === 'wave') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-8 bg-thmanyah-500 rounded-full"
              animate={{
                scaleY: [0.3, 1, 0.3],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
        {message && (
          <motion.p
            className={`${textSizes[size]} font-medium text-neutral-600 dark:text-neutral-400`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-thmanyah-400 to-thmanyah-600 flex items-center justify-center mb-4`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Radio className="w-1/2 h-1/2 text-white" />
        </motion.div>
        {message && (
          <motion.p
            className={`${textSizes[size]} font-medium text-neutral-600 dark:text-neutral-400`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-4">
        {/* Outer Ring */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-4 border-neutral-200 dark:border-neutral-700`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-transparent border-t-thmanyah-500`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Radio className="w-1/3 h-1/3 text-thmanyah-500" />
        </div>
      </div>
      
      {message && (
        <motion.p
          className={`${textSizes[size]} font-medium text-neutral-600 dark:text-neutral-400 text-center`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Loading Skeleton for Cards
export function PodcastCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white dark:bg-neutral-800 p-6 shadow-soft animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
        </div>
        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full w-16" />
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full w-20" />
      </div>
      
      <div className="flex justify-between">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
      </div>
    </div>
  );
}

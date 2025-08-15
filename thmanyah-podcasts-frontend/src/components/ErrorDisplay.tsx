'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Search, Wifi } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  type?: 'search' | 'network' | 'general';
  title?: string;
}

export default function ErrorDisplay({ 
  message, 
  onRetry, 
  type = 'general',
  title 
}: ErrorDisplayProps) {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-12 h-12 text-neutral-400" />;
      case 'network':
        return <Wifi className="w-12 h-12 text-neutral-400" />;
      default:
        return <AlertCircle className="w-12 h-12 text-neutral-400" />;
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'search':
        return 'لم يتم العثور على نتائج';
      case 'network':
        return 'مشكلة في الاتصال';
      default:
        return 'حدث خطأ ما';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'search':
        return 'جرب استخدام كلمات مختلفة أو تحقق من صحة كتابة المصطلح';
      case 'network':
        return 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى';
      default:
        return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 p-6"
      >
        {getIcon()}
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-neutral-900 dark:text-white mb-2"
      >
        {getTitle()}
      </motion.h3>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-neutral-600 dark:text-neutral-400 mb-2 max-w-md"
      >
        {message}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-neutral-500 dark:text-neutral-500 mb-6 max-w-md"
      >
        {getDescription()}
      </motion.p>

      {/* Retry Button */}
      {onRetry && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="group flex items-center gap-2 rounded-xl bg-thmanyah-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-thmanyah-600 hover:shadow-xl"
        >
          <RefreshCw className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
          حاول مرة أخرى
        </motion.button>
      )}
    </motion.div>
  );
}

// Empty State Component
interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Icon */}
      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-6 rounded-full bg-gradient-to-br from-thmanyah-100 to-thmanyah-200 dark:from-thmanyah-900/50 dark:to-thmanyah-800/50 p-6"
        >
          {icon}
        </motion.div>
      )}

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-3"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>

      {/* Action */}
      {action && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="group flex items-center gap-2 rounded-xl bg-thmanyah-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-thmanyah-600 hover:shadow-xl"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}

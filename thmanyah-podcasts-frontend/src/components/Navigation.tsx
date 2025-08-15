'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Search, Compass } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/search', label: 'البحث', icon: Search },
    { href: '/discover', label: 'استكشاف', icon: Compass },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Enhanced Backdrop - Full Screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[99998]"
            onClick={onClose}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              minWidth: '100vw'
            }}
          />
          
          {/* Navigation Panel - Fixed Background */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-screen w-80 max-w-[80vw] shadow-2xl border-r-2 border-neutral-200 dark:border-neutral-700 transform-gpu bg-white dark:bg-neutral-900 z-[99999] will-change-transform"
            style={{
              willChange: 'transform',
              height: '100vh',
              minHeight: '100vh',
              transform: 'translateZ(0)' // Force hardware acceleration
            }}
          >
            {/* Content wrapper */}
            <div className="relative h-screen flex flex-col" style={{ height: '100vh', minHeight: '100vh' }}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                القائمة الرئيسية
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-6 bg-neutral-50 dark:bg-neutral-900 flex-1">
              <ul className="space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.li 
                      key={item.href}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.08), duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-thmanyah-100 text-thmanyah-700 dark:bg-thmanyah-900/50 dark:text-thmanyah-300 shadow-lg border-2 border-thmanyah-200 dark:border-thmanyah-700'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 hover:translate-x-1'
                        }`}
                      >
                        <Icon className={`w-5 h-5 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`} />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-3 h-3 rounded-full bg-thmanyah-500 shadow-lg animate-pulse"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="mt-auto p-6 border-t border-neutral-200 dark:border-neutral-700 bg-thmanyah-50 dark:bg-neutral-800">
              <div className="text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  منصة ثمانية للبودكاست
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                  اكتشف أفضل البرامج الصوتية
                </p>
              </div>
            </div>
            </div> {/* Close content wrapper */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={() => setIsMobileNavOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-thmanyah-100 dark:hover:bg-thmanyah-900/50 hover:text-thmanyah-600 dark:hover:text-thmanyah-400 transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="فتح القائمة الرئيسية"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}

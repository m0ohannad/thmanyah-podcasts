'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Radio, Sparkles, TrendingUp, Heart } from 'lucide-react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    
    setIsLoading(true);
    // Navigate to search page with query
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const handleSearchFocus = () => {
    // Scroll to search section
    const searchSection = document.getElementById('search-section');
    searchSection?.scrollIntoView({ behavior: 'smooth' });
    // Focus the search input after scroll
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 500);
  };

  const features = [
    {
      icon: <Radio className="w-8 h-8" />,
      title: "بحث شامل",
      description: "ابحث في مئات الآلاف من البودكاست العربية والعالمية"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "جودة عالية",
      description: "محتوى مُختار بعناية لضمان أفضل تجربة استماع"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "آخر الصيحات",
      description: "اكتشف أحدث وأكثر البودكاست رواجاً"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <Header onSearchFocus={handleSearchFocus} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-thmanyah-200/30 rounded-full blur-3xl animate-pulse-gentle" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-thmanyah-500 to-thmanyah-600 shadow-2xl mb-8"
            >
              <Radio className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6"
            >
              <span className="block">اكتشف عالم</span>
              <span className="block bg-gradient-to-r from-thmanyah-500 to-thmanyah-600 bg-clip-text">
                البودكاست
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              منصة ثمانية للبودكاست - ابحث واكتشف أفضل البرامج الصوتية من جميع أنحاء العالم
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={handleSearchFocus}
                className="group relative overflow-hidden rounded-2xl bg-thmanyah-500 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-thmanyah-600 hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10">ابدأ البحث الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Heart className="w-4 h-4 text-red-500" />
                <span>أكثر من 100 ألف بودكاست متاح</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-16 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
            >
              ابحث عن بودكاستك المفضل
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400"
            >
              اكتب اسم البودكاست أو موضوع يهمك وسنجد لك أفضل البرامج
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={handleSearch}
              isLoading={isLoading}
              placeholder="مثال: فنجان، كتب صوتية، تقنية..."
              className="mb-8"
            />
          </motion.div>

          {/* Quick Search Suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {['فنجان', 'تقنية', 'كتب صوتية', 'تطوير الذات', 'الأعمال'].map((term, index) => (
              <motion.button
                key={term}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(term)}
                className="rounded-full border-2 border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-sm transition-all duration-300 hover:border-thmanyah-300 hover:bg-thmanyah-50/80 hover:text-thmanyah-700 dark:hover:border-thmanyah-600 dark:hover:bg-thmanyah-900/20 dark:hover:text-thmanyah-300"
              >
                {term}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              لماذا تختار منصة ثمانية؟
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              نقدم لك تجربة استثنائية لاكتشاف أفضل المحتوى الصوتي
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group text-center p-8 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-thmanyah-100 to-thmanyah-200 dark:from-thmanyah-900/50 dark:to-thmanyah-800/50 text-thmanyah-600 dark:text-thmanyah-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-thmanyah-600 dark:group-hover:text-thmanyah-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-thmanyah-500 to-thmanyah-600 flex items-center justify-center">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">بودكاست ثمانية</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              منصة شاملة لاكتشاف أفضل البودكاست من جميع أنحاء العالم
            </p>
            <p className="text-sm text-neutral-500">
              © 2025 ثمانية. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

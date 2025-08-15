'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Star, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { EmptyState } from '@/components/ErrorDisplay';
import { useRouter } from 'next/navigation';

export default function DiscoverPage() {
  const router = useRouter();

  const categories = [
    { name: 'التقنية والبرمجة', search: 'تقنية برمجة', icon: '💻', color: 'bg-blue-100 text-blue-600' },
    { name: 'الأعمال والريادة', search: 'أعمال ريادة', icon: '💼', color: 'bg-green-100 text-green-600' },
    { name: 'التطوير الشخصي', search: 'تطوير الذات', icon: '🌱', color: 'bg-purple-100 text-purple-600' },
    { name: 'الثقافة والأدب', search: 'ثقافة أدب', icon: '📚', color: 'bg-orange-100 text-orange-600' },
    { name: 'العلوم والفلك', search: 'علوم فلك', icon: '🔬', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'الرياضة', search: 'رياضة كرة', icon: '⚽', color: 'bg-red-100 text-red-600' },
    { name: 'الصحة واللياقة', search: 'صحة لياقة', icon: '🏋️', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'الطبخ والطعام', search: 'طبخ طعام', icon: '🍳', color: 'bg-yellow-100 text-yellow-600' },
  ];

  const popularPodcasts = [
    { name: 'فنجان', description: 'بودكاست أسبوعي من ثمانية' },
    { name: 'تقنية', description: 'مناقشات تقنية عميقة' },
    { name: 'كتب صوتية', description: 'أفضل الكتب الصوتية' },
    { name: 'تطوير الذات', description: 'برامج التطوير الشخصي' },
  ];

  const handleCategoryClick = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handlePopularClick = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-thmanyah-50 to-white dark:from-thmanyah-900/20 dark:to-neutral-800 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-thmanyah-500 to-thmanyah-600 mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              استكشف البودكاست
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              اكتشف أفضل البودكاست حسب التصنيفات والمواضيع المختلفة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              التصنيفات الشائعة
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              استكشف البودكاست حسب اهتماماتك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.search)}
                className="group p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1 text-right"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110`}>
                    {category.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-thmanyah-500 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-thmanyah-600 dark:group-hover:text-thmanyah-400 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  اكتشف أفضل البرامج في {category.name}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              البحثات الشائعة
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              ما يبحث عنه الآخرون الآن
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPodcasts.map((podcast, index) => (
              <motion.button
                key={podcast.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handlePopularClick(podcast.name)}
                className="group p-6 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-thmanyah-300 dark:hover:border-thmanyah-600 transition-all duration-300 text-right"
              >
                <div className="flex items-center mb-3">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">شائع</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-thmanyah-600 dark:group-hover:text-thmanyah-400 transition-colors duration-300">
                  {podcast.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {podcast.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <EmptyState
              title="المزيد قادم قريباً"
              description="نعمل على إضافة المزيد من الميزات الرائعة لاستكشاف البودكاست بطرق جديدة ومثيرة"
              icon={<Clock className="w-12 h-12 text-thmanyah-500" />}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

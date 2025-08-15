'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Filter, SortAsc, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import PodcastCard from '@/components/PodcastCard';
import Loading, { PodcastCardSkeleton } from '@/components/Loading';
import ErrorDisplay, { EmptyState } from '@/components/ErrorDisplay';
import ScrollToTop from '@/components/ScrollToTop';
import { ToastContainer, useToast } from '@/components/Toast';
import ApiService from '@/services/api';
import { Podcast, SearchResponse } from '@/types/podcast';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const { toasts, removeToast } = useToast();

  const [searchTerm, setSearchTerm] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term: string) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response: SearchResponse = await ApiService.searchPodcasts(term);
      setResults(response.items || []);
      
      // Update URL without causing a reload
      const newUrl = `/search?q=${encodeURIComponent(term)}`;
      window.history.replaceState(null, '', newUrl);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في البحث');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    performSearch(term);
  };

  const handleRetry = () => {
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header />
      
      {/* Search Header */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6"
          >
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-1 hover:text-thmanyah-600 dark:hover:text-thmanyah-400 transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4" />
              الرئيسية
            </button>
            <span>/</span>
            <span>البحث</span>
            {query && (
              <>
                <span>/</span>
                <span className="font-medium text-neutral-900 dark:text-white">&ldquo;{query}&rdquo;</span>
              </>
            )}
          </motion.div>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={handleSearch}
              isLoading={isLoading}
              autoFocus={!query}
              className="mb-6"
            />
          </motion.div>

          {/* Results Header */}
          <AnimatePresence>
            {hasSearched && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  {results.length > 0 ? (
                    <p className="text-neutral-700 dark:text-neutral-300">
                      تم العثور على <span className="font-bold text-thmanyah-600">{results.length}</span> نتيجة
                      {searchTerm && <span> لـ &ldquo;<span className="font-medium">{searchTerm}</span>&rdquo;</span>}
                    </p>
                  ) : error ? (
                    <p className="text-red-600 dark:text-red-400">لم يتم العثور على نتائج</p>
                  ) : null}
                </div>

                {results.length > 0 && (
                  <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === 'grid'
                            ? 'bg-thmanyah-100 text-thmanyah-600 dark:bg-thmanyah-900/50 dark:text-thmanyah-400'
                            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === 'list'
                            ? 'bg-thmanyah-100 text-thmanyah-600 dark:bg-thmanyah-900/50 dark:text-thmanyah-400'
                            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sort Button */}
                    <button className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                      <SortAsc className="w-4 h-4" />
                      ترتيب
                    </button>

                    {/* Filter Button */}
                    <button className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                      <Filter className="w-4 h-4" />
                      تصفية
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-8">
                  <Loading message="جاري البحث عن البودكاست..." type="wave" />
                </div>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {[...Array(6)].map((_, i) => (
                    <PodcastCardSkeleton key={i} />
                  ))}
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <ErrorDisplay
                  message={error}
                  onRetry={handleRetry}
                  type="search"
                />
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1 max-w-4xl mx-auto'
                }`}
              >
                {results.map((podcast, index) => (
                  <PodcastCard
                    key={podcast.podcastId}
                    podcast={podcast}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : hasSearched ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <EmptyState
                  title="لم يتم العثور على نتائج"
                  description={`لم نتمكن من العثور على أي بودكاست يطابق بحثك "${searchTerm}". جرب استخدام كلمات مختلفة أو تحقق من صحة كتابة المصطلح.`}
                  action={{
                    label: "العودة للرئيسية",
                    onClick: handleBackToHome
                  }}
                  icon={<Filter className="w-12 h-12 text-neutral-400" />}
                />
              </motion.div>
            ) : (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  ابدأ بكتابة مصطلح البحث أعلاه لاكتشاف البودكاست
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <Loading />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

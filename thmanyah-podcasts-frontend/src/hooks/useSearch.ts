'use client';

import { useState, useCallback } from 'react';
import ApiService from '@/services/api';
import { Podcast, SearchResponse } from '@/types/podcast';

interface UseSearchResult {
  results: Podcast[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  search: (term: string) => Promise<void>;
  clearResults: () => void;
  retry: () => void;
}

export function useSearch(): UseSearchResult {
  const [results, setResults] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');

  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setError('مصطلح البحث مطلوب');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setLastSearchTerm(term);

    try {
      const response: SearchResponse = await ApiService.searchPodcasts(term);
      setResults(response.items || []);
      
      if (response.items.length === 0) {
        setError('لم يتم العثور على نتائج لهذا البحث');
      }
    } catch (err) {
      console.error('Search failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في البحث';
      setError(errorMessage);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
    setHasSearched(false);
    setLastSearchTerm('');
  }, []);

  const retry = useCallback(() => {
    if (lastSearchTerm) {
      search(lastSearchTerm);
    }
  }, [lastSearchTerm, search]);

  return {
    results,
    isLoading,
    error,
    hasSearched,
    search,
    clearResults,
    retry,
  };
}

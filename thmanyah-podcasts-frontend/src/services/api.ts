import { SearchResponse } from '@/types/podcast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  }

  static async searchPodcasts(term: string): Promise<SearchResponse> {
    if (!term.trim()) {
      throw new Error('Search term is required');
    }

    const encodedTerm = encodeURIComponent(term.trim());
    return this.request<SearchResponse>(`/v1/search/podcasts?term=${encodedTerm}`);
  }
}

export default ApiService;

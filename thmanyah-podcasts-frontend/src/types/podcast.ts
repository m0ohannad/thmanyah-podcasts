export interface Podcast {
  podcastId: string;
  title: string;
  author: string;
  feedUrl?: string;
  artworkUrl?: string;
  genres?: string[];
  itunesUrl?: string;
  releaseDate?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  count: number;
  items: Podcast[];
}

export interface SearchParams {
  term: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

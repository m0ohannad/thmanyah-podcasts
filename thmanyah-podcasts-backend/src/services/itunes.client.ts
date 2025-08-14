import axios from 'axios';

export interface ItunesPodcast {
    trackId: number;
    trackName: string;
    artistName: string;
    feedUrl?: string;
    artworkUrl600?: string;
    genres?: string[];
    primaryGenreName?: string;
    releaseDate?: string;
    trackViewUrl?: string;
}

export class ItunesClient {
    private baseURL = 'https://itunes.apple.com';

    async searchPodcasts(term: string, limit = 50): Promise<ItunesPodcast[]> {
        const res = await axios.get(`${this.baseURL}/search`, {
            params: { media: 'podcast', term, limit },
            timeout: 8000
        });
        return res.data?.results ?? [];
    }
}

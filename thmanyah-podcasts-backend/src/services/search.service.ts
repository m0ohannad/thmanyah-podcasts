import { ItunesClient } from './itunes.client';
import { PodcastRepository } from '../repositories/podcast.repository';
import { Podcast } from '../models/podcast.model';

export class SearchService {
    constructor(
        private readonly itunes = new ItunesClient(),
        private readonly repo = new PodcastRepository()
    ) { }

    async searchAndStore(term: string): Promise<Podcast[]> {
        const results = await this.itunes.searchPodcasts(term, 50);

        // convert dates to ISO
        const now = new Date().toISOString();
        const toIso = (s?: string): string | undefined => {
            if (!s) return undefined;
            const d = new Date(s);
            return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
        };

        // remove duplicates by trackId
        const uniqueMap = new Map<number, any>();
        for (const item of results) {
            if (item.trackId) uniqueMap.set(item.trackId, item);
        }

        const podcasts: Podcast[] = Array.from(uniqueMap.values()).map((i) => ({
            podcastId: String(i.trackId),
            title: i.trackName ?? 'Untitled',
            author: i.artistName ?? 'Unknown',
            feedUrl: i.feedUrl,
            artworkUrl: i.artworkUrl600,
            genres: i.genres ?? (i.primaryGenreName ? [i.primaryGenreName] : undefined),
            itunesUrl: i.trackViewUrl,
            releaseDate: toIso(i.releaseDate),
            firstSeenAt: now,
            lastSeenAt: now,
            updatedAt: now
        }));

        // Store the podcasts in the database
        await this.repo.upsertManyIdempotent(podcasts);

        return podcasts;
    }
}

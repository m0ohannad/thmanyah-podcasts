import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { SearchService } from '../services/search.service';
import { normalizeSearchTerm } from '../utils/normalize';

const QuerySchema = Type.Object({
    term: Type.String({ minLength: 1, description: 'Search term' })
});

export default async function searchRoute(app: FastifyInstance) {
    const service = new SearchService();

    app.route({
        method: 'GET',
        url: '/v1/search/podcasts',
        schema: {
            querystring: QuerySchema,
            response: {
                200: Type.Object({
                    count: Type.Number(),
                    items: Type.Array(Type.Object({
                        podcastId: Type.String(),
                        title: Type.String(),
                        author: Type.String(),
                        feedUrl: Type.Optional(Type.String()),
                        artworkUrl: Type.Optional(Type.String()),
                        genres: Type.Optional(Type.Array(Type.String())),
                        itunesUrl: Type.Optional(Type.String()),
                        releaseDate: Type.Optional(Type.String()),
                        firstSeenAt: Type.String(),
                        lastSeenAt: Type.String(),
                        updatedAt: Type.String()
                    }))
                })
            },
            tags: ['search'],
            summary: 'Search podcasts via iTunes, store in DynamoDB (idempotent), and return items.'
        },
        handler: async (req, reply) => {
            const { term } = req.query as { term: string };
            const normalized = normalizeSearchTerm(term);
            if (!normalized) return reply.badRequest('Query parameter "term" is required');

            try {
                const items = await service.searchAndStore(normalized);
                return reply.code(200).send({ count: items.length, items });
            } catch (err: any) {
                req.log.error({ err }, 'Search failed');
                return reply.internalServerError('Search failed');
            }
        }
    });
}

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { config } from '../config/env';
import { Podcast } from '../models/podcast.model';

const native = new DynamoDBClient({
    region: config.awsRegion,
    endpoint: config.dynamoEndpoint,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
    }
});

const ddb = DynamoDBDocumentClient.from(native);

export class PodcastRepository {
    private tableName = config.tablePodcasts;

    /**
     * Upserts a single Podcast item in an idempotent manner.
     */
    async upsertOneIdempotent(item: Podcast): Promise<void> {
        // Filter out undefined values to avoid DynamoDB errors
        const cleanItem = {
            title: item.title,
            author: item.author,
            feedUrl: item.feedUrl || null,
            artworkUrl: item.artworkUrl || null,
            genres: item.genres || null,
            itunesUrl: item.itunesUrl || null,
            releaseDate: item.releaseDate || null,
            firstSeenAt: item.firstSeenAt,
            lastSeenAt: item.lastSeenAt,
            updatedAt: item.updatedAt
        };

        await ddb.send(new UpdateCommand({
            TableName: this.tableName,
            Key: { podcastId: item.podcastId },
            UpdateExpression: `
        SET #title = :title,
            #author = :author,
            #feedUrl = :feedUrl,
            #artworkUrl = :artworkUrl,
            #genres = :genres,
            #itunesUrl = :itunesUrl,
            #releaseDate = :releaseDate,
            #firstSeenAt = if_not_exists(#firstSeenAt, :firstSeenAt),
            #lastSeenAt = :lastSeenAt,
            #updatedAt = :updatedAt
      `,
            ExpressionAttributeNames: {
                '#title': 'title',
                '#author': 'author',
                '#feedUrl': 'feedUrl',
                '#artworkUrl': 'artworkUrl',
                '#genres': 'genres',
                '#itunesUrl': 'itunesUrl',
                '#releaseDate': 'releaseDate',
                '#firstSeenAt': 'firstSeenAt',
                '#lastSeenAt': 'lastSeenAt',
                '#updatedAt': 'updatedAt'
            },
            ExpressionAttributeValues: {
                ':title': cleanItem.title,
                ':author': cleanItem.author,
                ':feedUrl': cleanItem.feedUrl,
                ':artworkUrl': cleanItem.artworkUrl,
                ':genres': cleanItem.genres,
                ':itunesUrl': cleanItem.itunesUrl,
                ':releaseDate': cleanItem.releaseDate,
                ':firstSeenAt': cleanItem.firstSeenAt,
                ':lastSeenAt': cleanItem.lastSeenAt,
                ':updatedAt': cleanItem.updatedAt
            }
        }));
    }

    /**
     * Upserts multiple Podcast items in an idempotent manner.
     */
    async upsertManyIdempotent(items: Podcast[]): Promise<void> {
        // Process items in parallel for better performance
        const promises = items.map(item => this.upsertOneIdempotent(item));
        await Promise.all(promises);
    }
}

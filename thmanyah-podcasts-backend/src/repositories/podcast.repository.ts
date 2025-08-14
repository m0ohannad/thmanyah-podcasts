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
            #language = :language,
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
        '#language': 'language',
        '#firstSeenAt': 'firstSeenAt',
        '#lastSeenAt': 'lastSeenAt',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':title': item.title,
        ':author': item.author,
        ':feedUrl': item.feedUrl,
        ':artworkUrl': item.artworkUrl,
        ':genres': item.genres,
        ':itunesUrl': item.itunesUrl,
        ':language': item.language,
        ':firstSeenAt': item.firstSeenAt,
        ':lastSeenAt': item.lastSeenAt,
        ':updatedAt': item.updatedAt
      }
    }));
  }

  /**
   * Upserts multiple Podcast items in an idempotent manner.
   */
  async upsertManyIdempotent(items: Podcast[]): Promise<void> {
    for (const item of items) {
      await this.upsertOneIdempotent(item);
    }
  }
}

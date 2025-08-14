import { CreateTableCommand, DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { config } from '../src/config/env';

async function main() {
  const client = new DynamoDBClient({
    region: config.awsRegion,
    endpoint: config.dynamoEndpoint,
    credentials: {
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey
    }
  });

  const existing = await client.send(new ListTablesCommand({}));
  if (existing.TableNames?.includes(config.tablePodcasts)) {
    console.log(`Table "${config.tablePodcasts}" already exists.`);
    return;
  }

  await client.send(new CreateTableCommand({
    TableName: config.tablePodcasts,
    AttributeDefinitions: [
      { AttributeName: 'podcastId', AttributeType: 'S' }
    ],
    KeySchema: [
      { AttributeName: 'podcastId', KeyType: 'HASH' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }));

  console.log(`Table "${config.tablePodcasts}" created.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

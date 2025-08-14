import { buildApp } from './app';
import { config } from './config/env';

const app = buildApp();

app.listen({ port: config.port, host: '0.0.0.0' })
  .then(() => app.log.info(`API listening on http://localhost:${config.port}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

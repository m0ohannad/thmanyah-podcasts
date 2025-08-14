import Fastify from 'fastify';
import corsPlugin from './plugins/cors';
import sensiblePlugin from './plugins/sensible';
import swaggerPlugin from './plugins/swagger';
import searchRoute from './routes/search.route';

export function buildApp() {
  const app = Fastify({ logger: { level: 'info' } });

  app.register(corsPlugin);
  app.register(sensiblePlugin);
  app.register(swaggerPlugin);

  app.register(searchRoute);

  app.get('/health', async () => ({ status: 'ok' }));

  return app;
}

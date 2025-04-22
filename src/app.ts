import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { appRoutes } from './http/routes/routes';

export const app = fastify();

app.register(appRoutes);

app.addHook('preHandler', async (request, _) => {
  console.log(`[${request.method}] : ${request.url}`);
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});

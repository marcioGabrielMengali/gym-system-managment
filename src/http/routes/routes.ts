import { FastifyInstance } from 'fastify';
import { registerGym } from '../controllers/register-gym-controller';
import { authenticate } from '../controllers/authenticate-controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/gym', registerGym);
  app.post('/sessions', authenticate);
}

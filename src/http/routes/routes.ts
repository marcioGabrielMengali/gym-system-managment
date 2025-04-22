import { FastifyInstance } from 'fastify';
import { registerGym } from '../controllers/register-gym-controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/gym', registerGym);
}

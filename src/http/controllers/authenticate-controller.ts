import { z } from 'zod';
import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBody = z.object({
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'email is not valid' }),
    password: z.string({ required_error: 'password is required' }),
  });
  const authenticateUseCase = makeAuthenticateUseCase();
  const data = authenticateBody.parse(request.body);
  try {
    await authenticateUseCase.authenticate(data);
  } catch (error) {
    console.error('authenticate error', error);
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
  reply.status(200).send();
}

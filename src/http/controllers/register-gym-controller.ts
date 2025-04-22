import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { GymAlreadyExistsError } from '../use-cases/errors/gym-already-exitst-error';
import { makeRegisterGymUseCase } from '../use-cases/factories/make-register-gym-use-case';

export async function registerGym(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerGym = z.object({
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'email is not valid' }),
    password: z
      .string({ required_error: 'password is required' })
      .min(6, { message: 'password should have at least 6 characters' }),
    country: z.string({ required_error: 'country is required' }),
    state: z
      .string({ required_error: 'password is required' })
      .length(2, { message: 'state should have 2 characters' }),
    city: z.string({ required_error: 'city is required' }),
    zipCode: z
      .string({ required_error: 'zipCode is required' })
      .min(6, { message: 'zipCode should have at least 6 characters' }),
  });

  const data = registerGym.parse(request.body);
  try {
    const registerGymUseCase = makeRegisterGymUseCase();
    await registerGymUseCase.registerGym(data);
  } catch (error) {
    console.error('registerGym error', error);
    if (error instanceof GymAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}

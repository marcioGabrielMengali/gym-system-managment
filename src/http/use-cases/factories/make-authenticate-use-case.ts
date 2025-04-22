import { PrismaGymRepostiroy } from '@/repositories/prisma/prisma-gym-repository';
import { AuthenticateUseCase } from '../authenticate-use-case';

export function makeAuthenticateUseCase() {
  const gymRepository = new PrismaGymRepostiroy();
  return new AuthenticateUseCase(gymRepository);
}

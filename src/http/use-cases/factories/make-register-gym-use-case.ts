import { PrismaGymRepostiroy } from '@/repositories/prisma/prisma-gym-repository';
import { RegisterGymUseCase } from '../register-gym-use-case';

export function makeRegisterGymUseCase() {
  const gymRepository = new PrismaGymRepostiroy();
  const registerGymUseCase = new RegisterGymUseCase(gymRepository);
  return registerGymUseCase;
}
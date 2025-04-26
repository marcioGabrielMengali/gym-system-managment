import { PrismaGymRepostiroy } from '@/repositories/prisma/prisma-gym-repository';
import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository';
import { RegisterMemberUseCase } from '../register-member-use-case';

export function makeRegisterMemberUseCase() {
    const gymsRepository = new PrismaGymRepostiroy();
    const membersRepository = new PrismaMembersRepository();
    const registerMembersUseCase = new RegisterMemberUseCase(gymsRepository, membersRepository);
    return registerMembersUseCase;
}
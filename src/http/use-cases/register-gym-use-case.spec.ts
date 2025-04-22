import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterGymUseCase } from './register-gym-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { Prisma } from '@prisma/client';
import { compare } from 'bcryptjs';
import { GymAlreadyExistsError } from './errors/gym-already-exitst-error';
import { GymRepository } from '@/repositories/gym-repository';

describe(RegisterGymUseCase.name, () => {
  let sut: RegisterGymUseCase;
  let gymRepository: GymRepository;
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new RegisterGymUseCase(gymRepository);
  });
  it('password should be encrypted', async () => {
    const data: Prisma.GymCreateInput = {
      city: 'city test',
      country: 'country test',
      email: 'testemail@gmail.com',
      password: '123456',
      state: 'state test',
      zipCode: '123456',
    };
    const { gym } = await sut.registerGym(data);
    const isPasswordHashed = await compare('123456', gym.password);
    expect(isPasswordHashed).toBe(true);
  });
  it('should throw GymAlreadyExistsError', async () => {
    const email = 'testemail@gmail.com';
    const data: Prisma.GymCreateInput = {
      city: 'city test',
      country: 'country test',
      email,
      password: '123456',
      state: 'state test',
      zipCode: '123456',
    };
    await sut.registerGym(data);
    await expect(() => sut.registerGym(data)).rejects.toBeInstanceOf(
      GymAlreadyExistsError
    );
  });
  it('should create gym', async () => {
    const data: Prisma.GymCreateInput = {
      city: 'city test',
      country: 'country test',
      email: 'testemail@gmail.com',
      password: '123456',
      state: 'state test',
      zipCode: '123456',
    };
    const { gym } = await sut.registerGym(data);
    expect(gym.id).toEqual(expect.any(String));
  });
});

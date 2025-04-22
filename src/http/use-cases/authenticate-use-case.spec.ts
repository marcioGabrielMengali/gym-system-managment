import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate-use-case';
import { GymRepository } from '@/repositories/gym-repository';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { hash } from 'bcryptjs';

describe(AuthenticateUseCase.name, () => {
  let sut: AuthenticateUseCase;
  let gymRepository: GymRepository;
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new AuthenticateUseCase(gymRepository);
  });

  it('should throw an InvalidCredentialError if the email is not found', async () => {
    await expect(
      sut.authenticate({ email: 'someEmail.com', password: 'somePassword' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it('should throw an InvalidCredentialError if password is invalid', async () => {
    await gymRepository.create({
      city: 'city test',
      country: 'country test',
      email: 'someEmail.com',
      password: '1234',
      state: 'state test',
      zipCode: '123456',
    });
    await expect(
      sut.authenticate({ email: 'someEmail.com', password: 'somePassword' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it('should be able to authenticate', async () => {
    await gymRepository.create({
      city: 'city test',
      country: 'country test',
      email: 'someEmail.com',
      password: await hash('1234', 6),
      state: 'state test',
      zipCode: '123456',
    });
    const { gym } = await sut.authenticate({
      email: 'someEmail.com',
      password: '1234',
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});

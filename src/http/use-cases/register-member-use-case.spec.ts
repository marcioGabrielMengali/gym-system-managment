import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RegisterMemberUseCase } from './register-member-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository';
import { GymNotFoundError } from './errors/gym-not-found-error';
import { MemberAlreadyExistsError } from './errors/member-already-exists';

describe(RegisterMemberUseCase.name, () => {
  let sut: RegisterMemberUseCase;
  let gymsRepostiory: InMemoryGymRepository;
  let membersRepository: InMemoryMembersRepository;

  beforeEach(() => {
    gymsRepostiory = new InMemoryGymRepository();
    membersRepository = new InMemoryMembersRepository();
    sut = new RegisterMemberUseCase(gymsRepostiory, membersRepository);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('Should not be able to register member without existing gym', async () => {
    await expect(() =>
      sut.registerMember({
        email: 'email-01',
        gymId: 'gym-01',
        phone: 'phone-01',
      })
    ).rejects.toBeInstanceOf(GymNotFoundError);
  });
  it('Sould not register a member with the same email', async () => {
    vi.setSystemTime(new Date(2023, 0, 1));
    gymsRepostiory.items.push({
      id: 'gym-01',
      city: 'city-01',
      country: 'country-01',
      email: 'email-01',
      password: 'password-01',
      state: 'state-01',
      zipCode: 'zipCode-01',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    membersRepository.items.push({
      id: 'member-01',
      email: 'email-01',
      phone: 'phone-01',
      active: true,
      gymId: 'gym-01',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await expect(() =>
      sut.registerMember({
        email: 'email-01',
        gymId: 'gym-01',
        phone: 'phone-01',
      })
    ).rejects.toBeInstanceOf(MemberAlreadyExistsError);
  });
  it('should be able to register a member', async () => {
    vi.setSystemTime(new Date(2023, 0, 1));
    gymsRepostiory.items.push({
      id: 'gym-01',
      city: 'city-01',
      country: 'country-01',
      email: 'email-01',
      password: 'password-01',
      state: 'state-01',
      zipCode: 'zipCode-01',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const { member } = await sut.registerMember({
      email: 'email-01',
      gymId: 'gym-01',
      phone: 'phone-01',
    });
    expect(member.id).toEqual(expect.any(String));
  });
});

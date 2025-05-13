import { beforeEach, describe, expect, it } from 'vitest';
import { FetchMembersUseCase } from './fetch-members-use-case';
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository';

describe(FetchMembersUseCase.name, () => {
  let sut: FetchMembersUseCase;
  let membersRepository: InMemoryMembersRepository;

  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    sut = new FetchMembersUseCase(membersRepository);
  });
  it('Should return members', async () => {
    await membersRepository.create({
        email: 'emailTest@gmail.com',
        gymId: 'gym-01',
        phone: '123456',
      });
      const { members } = await sut.fetchMembers({ gymId: 'gym-01', page: 1 });
      expect(members).toHaveLength(1);
      expect(members).toEqual(expect.arrayContaining([expect.objectContaining({gymId: 'gym-01'})]));
  });
  it('Should return 20 members per page', async () => {
    for (let i = 0; i <= 21; i++) {
      await membersRepository.create({
        email: `email-${i}@gmail.com`,
        gymId: 'gym-01',
        phone: '123456',
      });
    }
    const { members } = await sut.fetchMembers({ gymId: 'gym-01', page: 2 });
    expect(members).toHaveLength(2);
    expect(members).toEqual([
      expect.objectContaining({ email: 'email-20@gmail.com' }),
      expect.objectContaining({ email: 'email-21@gmail.com' }),
    ]);
  });
});

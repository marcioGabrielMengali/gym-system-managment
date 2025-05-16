import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository';
import { MemberNotFoundError } from './errors/member-not-found-error';
import { DatabaseError } from './errors/database-error';
import { DeactivateMemberUseCase } from './deactivate-member-use-case';

describe('Update Member Use Case', () => {
  let sut: DeactivateMemberUseCase;
  let membersRepository: InMemoryMembersRepository;

  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    sut = new DeactivateMemberUseCase(membersRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Should throw new MemberNotFoundError', async () => {
    await expect(() =>
      sut.deactivateMember({ id: 'someId' })
    ).rejects.toBeInstanceOf(MemberNotFoundError);
  });
  it('Should throw new DatabaseError', async () => {
    vi.spyOn(membersRepository, 'update').mockResolvedValue(null);
    const createdMember = await membersRepository.create({
      email: 'testEmail@gmail.com',
      gymId: 'gym-01',
      phone: '123456789',
    });
    const id = createdMember.id;
    await expect(() =>
      sut.deactivateMember({ id })
    ).rejects.toBeInstanceOf(DatabaseError);
  });
  it('Should deactivate member', async () => {
    const createdMember = await membersRepository.create({
      email: 'testEmail@gmail.com',
      gymId: 'gym-01',
      phone: '123456789',
    });
    const id = createdMember.id;
    const expected = { ...createdMember, ...{ active: false } };
    const { member: result } = await sut.deactivateMember({
      id,
    });
    expect(result).toStrictEqual(expected);
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository';
import { MemberNotFoundError } from './errors/member-not-found-error';
import { DatabaseError } from './errors/database-error';
import { DeleteMemberUseCase } from './delte-member-use-case';

describe('Delete Member Use Case', () => {
  let sut: DeleteMemberUseCase;
  let membersRepository: InMemoryMembersRepository;

  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    sut = new DeleteMemberUseCase(membersRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Should throw new MemberNotFoundError', async () => {
    await expect(() =>
      sut.DeleteMember({ id: 'someId' })
    ).rejects.toBeInstanceOf(MemberNotFoundError);
  });
  it('Should throw new DatabaseError', async () => {
    vi.spyOn(membersRepository, 'delete').mockResolvedValue(null);
    const createdMember = await membersRepository.create({
      email: 'testEmail@gmail.com',
      gymId: 'gym-01',
      phone: '123456789',
    });
    const id = createdMember.id;
    await expect(() => sut.DeleteMember({ id })).rejects.toBeInstanceOf(
      DatabaseError
    );
  });
  it('Should delete a member', async () => {
    const createdMember = await membersRepository.create({
      email: 'testEmail@gmail.com',
      gymId: 'gym-01',
      phone: '123456789',
    });
    const id = createdMember.id;
    const expected = { ...createdMember };
    const { member: result } = await sut.DeleteMember({
      id,
    });
    expect(result).toStrictEqual(expected);
    await expect(() =>
      sut.DeleteMember({
        id,
      })
    ).rejects.toBeInstanceOf(MemberNotFoundError);
  });
});

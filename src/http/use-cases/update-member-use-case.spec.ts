import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UpdateMemeberUseCase } from './update-member-use-case';
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository';
import { MemberNotFoundError } from './errors/member-not-found-error';
import { DatabaseError } from './errors/database-error';

describe('Update Member Use Case', () => {
  let sut: UpdateMemeberUseCase;
  let membersRepository: InMemoryMembersRepository;

  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    sut = new UpdateMemeberUseCase(membersRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Should throw new MemberNotFoundError', async () => {
    await membersRepository.create({
      email: 'testEmail@gmail.com',
      gymId: 'gym-01',
      phone: '123456789',
    });
    await expect(() =>
      sut.updateMember({ id: 'someId', member: { phone: '1234556' } })
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
      sut.updateMember({ id, member: { phone: '1234556' } })
    ).rejects.toBeInstanceOf(DatabaseError);
  });
  it('Should update member', async () => {
    const createdMember = await membersRepository.create({
      email: 'testEmail@gmail.com',
      gymId: 'gym-01',
      phone: '123456789',
    });
    const id = createdMember.id;
    const expected = { ...createdMember, ...{ phone: '123' } };
    const { member: result } = await sut.updateMember({
      id,
      member: { phone: '123' },
    });
    expect(result).toStrictEqual(expected);
  });
});

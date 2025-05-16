import { MembersRepository } from '@/repositories/members-repository';
import { Member } from '@prisma/client';
import { MemberNotFoundError } from './errors/member-not-found-error';
import { DatabaseError } from './errors/database-error';

interface DeactivateMemberUseCaseRequest {
  id: string;
}

interface DeactivateMemberUseCaseResponse {
  member: Member;
}

export class DeactivateMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async deactivateMember({
    id,
  }: DeactivateMemberUseCaseRequest): Promise<DeactivateMemberUseCaseResponse> {
    const isMember = await this.membersRepository.findById(id);

    if (!isMember) {
      throw new MemberNotFoundError();
    }

    const updatedMember = await this.membersRepository.update(id, {
      active: false,
    });

    if (!updatedMember) {
      throw new DatabaseError();
    }

    return { member: updatedMember };
  }
}

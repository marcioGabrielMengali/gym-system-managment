import { MembersRepository } from '@/repositories/members-repository';
import { Member } from '@prisma/client';
import { MemberNotFoundError } from './errors/member-not-found-error';
import { DatabaseError } from './errors/database-error';

interface DeleteMemberUseCaseRequest {
  id: string;
}

interface DeleteMemberUseCaseResponse {
  member: Member;
}

export class DeleteMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async DeleteMember({
    id,
  }: DeleteMemberUseCaseRequest): Promise<DeleteMemberUseCaseResponse> {
    const isMember = await this.membersRepository.findById(id);

    if (!isMember) {
      throw new MemberNotFoundError();
    }

    const deletedMember = await this.membersRepository.delete(id);

    if (!deletedMember) {
      throw new DatabaseError();
    }

    return { member: deletedMember };
  }
}

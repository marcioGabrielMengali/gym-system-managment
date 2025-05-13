import { MembersRepository } from '@/repositories/members-repository';
import { Member } from '@prisma/client';
import { MemberNotFoundError } from './errors/member-not-found-error';
import { DatabaseError } from './errors/database-error';

interface UpdateMemeberUseCaseRequest {
  id: string;
  member: Partial<Member>;
}

interface UpdateMemeberUseCaseResponse {
  member: Member;
}

export class UpdateMemeberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async updateMember({
    id,
    member,
  }: UpdateMemeberUseCaseRequest): Promise<UpdateMemeberUseCaseResponse> {
    const isMember = await this.membersRepository.findById(id);


    if (!isMember) {
      throw new MemberNotFoundError();
    }

    const updatedMember = await this.membersRepository.update(id, member);


    if (!updatedMember) {
      throw new DatabaseError();
    }

    return { member: updatedMember };
  }
}

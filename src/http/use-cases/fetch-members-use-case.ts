import { MembersRepository } from '@/repositories/members-repository';
import { Member } from '@prisma/client';

interface FetchMembersUseCaseRequest {
  gymId: string;
  page: number;
}

interface FetchMembersUseCaseResponse {
  members: Member[];
}

export class FetchMembersUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async fetchMembers({
    gymId,
    page
  }: FetchMembersUseCaseRequest): Promise<FetchMembersUseCaseResponse> {
    const members = await this.membersRepository.findManyBymGymId(gymId, page);
    return { members };
  }
}

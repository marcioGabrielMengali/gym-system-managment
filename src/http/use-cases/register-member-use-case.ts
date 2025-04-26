import { GymRepository } from '@/repositories/gym-repository';
import { MembersRepository } from '@/repositories/members-repository';
import { Member } from '@prisma/client';
import { GymNotFoundError } from './errors/gym-not-found-error';
import { MemberAlreadyExistsError } from './errors/member-already-exists';

interface RegisterMemberUseCaseRequest {
  email: string;
  phone: string;
  gymId: string;
}

interface RegisterMemberUseCaseResponse {
  member: Member;
}

export class RegisterMemberUseCase {
  constructor(
    private gymsRepostiory: GymRepository,
    private membersRepository: MembersRepository
  ) {}

  async registerMember({
    email,
    phone,
    gymId,
  }: RegisterMemberUseCaseRequest): Promise<RegisterMemberUseCaseResponse> {
    const gym = await this.gymsRepostiory.findById(gymId);

    if (!gym) {
      throw new GymNotFoundError();
    }

    const memberWithSameEmail = await this.membersRepository.findByEmail(email);

    if (memberWithSameEmail) {
      throw new MemberAlreadyExistsError();
    }

    const member = await this.membersRepository.create({
      email,
      phone,
      gymId,
    });

    return{
      member
    };
  }
}

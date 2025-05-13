import { Member, Prisma } from '@prisma/client';

export interface MembersRepository {
  create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>;
  findByEmail(email: string): Promise<Member | null>;
  findManyBymGymId(gymId: string, page: number): Promise<Member[]>;
}

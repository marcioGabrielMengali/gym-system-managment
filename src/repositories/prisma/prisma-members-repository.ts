import { Prisma, Member } from '@prisma/client';
import { MembersRepository } from '../members-repository';
import { prisma } from '@/lib/prisma';

export class PrismaMembersRepository implements MembersRepository {
  async create(data: Prisma.MemberUncheckedCreateInput): Promise<Member> {
    try {
      const member = prisma.member.create({ data });
      return member;
    } catch (error) {
      console.error(
        `${PrismaMembersRepository.name} :: ${this.create.name} :: error`,
        error
      );
      throw new Error();
    }
  }

  findByEmail(email: string): Promise<Member | null> {
    try {
      const member = prisma.member.findUnique({
        where: {
          email,
        },
      });
      return member;
    } catch (error) {
      console.error(
        `${PrismaMembersRepository.name} :: ${this.findByEmail.name} :: error`,
        error
      );
      throw new Error();
    }
  }
}

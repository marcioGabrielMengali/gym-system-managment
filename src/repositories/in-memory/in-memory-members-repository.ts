import { Member, Prisma } from '@prisma/client';
import { MembersRepository } from '../members-repository';

export class InMemoryMembersRepository implements MembersRepository {
  public items: Member[] = [];

  async create(data: Prisma.MemberUncheckedCreateInput) {
    const member = {
      id: 'member-1',
      email: data.email,
      phone: data.phone,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      gymId: data.gymId,
    };

    this.items.push(member);

    return member;
  }

  async findByEmail(email: string): Promise<Member | null> {
    const member = this.items.find((item) => item.email === email);
    if (!member) {
      return null;
    }
    return member;
  }

  async findManyBymGymId(gymId: string, page: number): Promise<Member[]> {
    const members = this.items.filter((item) => item.gymId === gymId).slice((page - 1) * 20, page * 20);
    return members;
  }
}

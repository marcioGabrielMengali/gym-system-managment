import { Prisma, Gym } from '@prisma/client';
import { GymRepository } from '../gym-repository';
import { prisma } from '@/lib/prisma';

export class PrismaGymRepostiroy implements GymRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    try {
      const gym = await prisma.gym.create({ data });
      return gym;
    } catch (error) {
      console.error(
        `${PrismaGymRepostiroy.name} :: ${this.create.name} :: error`,
        error
      );
      throw new Error();
    }
  }

  async findByEmail(email: string): Promise<Gym | null> {
    try {
      const gym = await prisma.gym.findUnique({
        where: {
          email,
        },
      });
      return gym;
    } catch (error) {
      console.error(
        `${PrismaGymRepostiroy.name} :: ${this.findByEmail.name} :: error`,
        error
      );
      throw new Error();
    }
  }
}

import { Gym, Prisma } from '@prisma/client';

export interface GymRepository {
  findByEmail(email: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
}

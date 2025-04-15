import { Gym, Prisma } from '@prisma/client';
import { GymRepository } from '../gym-repository';

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: 'gym-id',
      city: data.city,
      country: data.country,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      state: data.state,
      zipCode: data.zipCode,
      updatedAt: new Date(),
    };
    this.items.push(gym);
    return gym;
  }

  async findByEmail(email: string): Promise<Gym | null> {
    const gym: Gym | undefined = this.items.find(
      (item) => item.email === email
    );
    if (!gym) {
      return null;
    }
    return gym;
  }
}

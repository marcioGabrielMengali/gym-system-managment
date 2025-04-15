import { GymRepository } from '@/repositories/gym-repository';
import { Prisma } from '@prisma/client';
import { GymAlreadyExistsError } from './errors/gym-already-exitst-error';
import { hash } from 'bcryptjs';

export class GymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async createGym(data: Prisma.GymCreateInput) {
    try {
      const gymWithSameEmail = await this.gymRepository.findByEmail(data.email);
      if (gymWithSameEmail) {
        throw new GymAlreadyExistsError();
      }

      const password_hash = await hash(data.password, 6);
      data.password = password_hash;

      const gym = await this.gymRepository.create(data);
      return { gym };
    } catch (error) {
      console.error(
        `${GymUseCase.name} :: ${this.createGym.name} :: error`,
        error
      );
      throw error;
    }
  }
}

import { GymRepository } from '@/repositories/gym-repository';
import { Gym } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  gym: Gym;
}

export class AuthenticateUseCase {
  constructor(private readonly gymRepository: GymRepository) {}
  async authenticate({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const gym = await this.gymRepository.findByEmail(email);

    if (!gym) {
      throw new InvalidCredentialsError();
    }

    const dosPasswordMatch = await compare(password, gym.password);
    if (!dosPasswordMatch) {
      throw new InvalidCredentialsError();
    }
    return { gym };
  }
}

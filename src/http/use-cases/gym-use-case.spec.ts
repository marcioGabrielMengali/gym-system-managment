import { expect, describe, it } from 'vitest';
import { GymUseCase } from './gym-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { Gym, Prisma } from '@prisma/client';
import { compare } from 'bcryptjs';
import { GymAlreadyExistsError } from './errors/gym-already-exitst-error';

describe(GymUseCase.name, () => {
    it('password should be encrypted', async () => {
        const repository = new InMemoryGymRepository()
        const gymUseCase = new GymUseCase(repository)
        const data: Prisma.GymCreateInput = { 
            city: 'city test',
            country: 'country test',
            email: 'testemail@gmail.com',
            password: '123456',
            state: 'state test',
            zipCode: '123456'
        }
        const { gym } = await gymUseCase.createGym(data)
        const isPasswordHashed = await compare('123456', gym.password)
        expect(isPasswordHashed).toBe(true)
    })
    it('should throw GymAlreadyExistsError', async () => {
        const repository = new InMemoryGymRepository()
        const gymUseCase = new GymUseCase(repository)
        const email = 'testemail@gmail.com'
        const data: Prisma.GymCreateInput = { 
            city: 'city test',
            country: 'country test',
            email,
            password: '123456',
            state: 'state test',
            zipCode: '123456'
        }
        await gymUseCase.createGym(data)
        await expect(() => gymUseCase.createGym(data)).rejects.toBeInstanceOf(GymAlreadyExistsError)
    })
    it('should create gym', async () => {
        const repository = new InMemoryGymRepository()
        const gymUseCase = new GymUseCase(repository)
        const data: Prisma.GymCreateInput = { 
            city: 'city test',
            country: 'country test',
            email: 'testemail@gmail.com',
            password: '123456',
            state: 'state test',
            zipCode: '123456'
        }
        const { gym } = await gymUseCase.createGym(data)
        expect(gym.id).toEqual(expect.any(String))
    })
})
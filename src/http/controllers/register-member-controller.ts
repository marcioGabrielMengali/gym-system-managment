import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterMemberUseCase } from '../use-cases/factories/make-register-member-use-case';
import { GymNotFoundError } from '../use-cases/errors/gym-not-found-error';
import { MemberAlreadyExistsError } from '../use-cases/errors/member-already-exists';

export async function registerMemberController(request: FastifyRequest, reply: FastifyReply){
    const registerMember = z.object({
        email: z
            .string({ required_error: 'email is required' })
            .email({ message: 'email is not valid' }),
        phone: z.string({ required_error: 'phone is required' }),
        gymId: z.string({ required_error: 'gymId is required' }),
    });
    const data = registerMember.parse(request.body);
    try {
        const registerMembersUseCase = makeRegisterMemberUseCase();
        await registerMembersUseCase.registerMember(data);
    }catch(error){
        console.error('registerMember error', error);
        if(error instanceof GymNotFoundError){
            return reply.status(404).send({ message: error.message });
        }
        if(error instanceof MemberAlreadyExistsError){
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }
    return reply.status(201).send();
}
import { FastifyInstance } from "fastify";
import { register } from "../controllers/gym-controller";

export async function appRoutes(app:FastifyInstance) {
    app.post('/gym', register)
}
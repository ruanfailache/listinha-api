import jwt from "jsonwebtoken";
import { autoInjectable, singleton } from "tsyringe";

import { Env } from "../../core/constants/env";
import { SessionRepository } from "../../infrastructure/database/repositories/SessionRepository";

@singleton()
@autoInjectable()
export class CreateSessionUseCase {
    constructor(private readonly sessionRepository: SessionRepository) {}

    async execute(userId: string, payload: Record<string, string>) {
        const createdSession = await this.sessionRepository.create(
            userId,
            jwt.sign(payload, Env.JwtSecretKey, {
                expiresIn: "2h",
            }),
        );

        return createdSession.token;
    }
}

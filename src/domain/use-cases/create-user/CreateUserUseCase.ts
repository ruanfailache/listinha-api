import jwt from "jsonwebtoken";
import { autoInjectable, singleton } from "tsyringe";

import { Env } from "../../../core/constants/env";
import { ConflictError } from "../../../core/errors/http/ConflictError";
import { SessionRepository } from "../../../infrastructure/database/repositories/SessionRepository";
import { UserRepository } from "../../../infrastructure/database/repositories/UserRepository";
import { ICreateUser } from "../../entities/User";

@singleton()
@autoInjectable()
export class CreateUserUseCase {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async execute({ email, name, password }: Omit<ICreateUser, "session">) {
        const foundUser = await this.userRepository.findByEmail(email);

        if (foundUser) {
            throw new ConflictError({
                message: "User already exists",
            });
        }

        const createdSession = await this.sessionRepository.create(
            jwt.sign(
                {
                    email,
                    password,
                },
                Env.JwtSecretKey,
                {
                    expiresIn: "2h",
                },
            ),
        );

        const createdUser = await this.userRepository.create({
            email,
            name,
            password,
            session: createdSession,
        });

        return {
            userId: createdUser.id,
            token: createdSession.token,
        };
    }
}

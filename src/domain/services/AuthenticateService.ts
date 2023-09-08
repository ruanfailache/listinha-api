import jwt, { JwtPayload } from "jsonwebtoken";
import { autoInjectable, singleton } from "tsyringe";

import { IPostUserSignIn } from "../../application/dtos/IPostUserSignIn";
import { IPostUserSignUp } from "../../application/dtos/IPostUserSignUp";
import { HashAdapter } from "../../core/adapters/HashAdapter";
import { Env } from "../../core/constants/env";
import { ConflictError } from "../../core/errors/http/ConflictError";
import { UnauthorizedError } from "../../core/errors/http/UnauthorizedError";
import { SessionRepository } from "../../infrastructure/database/repositories/SessionRepository";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";

@singleton()
@autoInjectable()
export class AuthenticateService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
    ) {}

    async createSession(userId: string, payload: Record<string, string>) {
        const createdSession = await this.sessionRepository.create(
            userId,
            jwt.sign(payload, Env.JwtSecretKey, {
                expiresIn: "2h",
            }),
        );

        return createdSession.token;
    }

    async signIn({ email, password }: IPostUserSignIn) {
        const foundUser = await this.userRepository.findByEmail(email);

        if (!foundUser) {
            throw new UnauthorizedError({
                message: "User credentials are invalid!",
            });
        }

        const isCorrectPassword = HashAdapter.compare(password, foundUser.password);

        if (!isCorrectPassword) {
            throw new UnauthorizedError({
                message: "User credentials are invalid!",
            });
        }

        return {
            userId: foundUser.id,
            token: await this.createSession(foundUser.id, {
                id: foundUser.id,
            }),
        };
    }

    async signUp({ email, name, password }: IPostUserSignUp) {
        const foundUser = await this.userRepository.findByEmail(email);

        if (foundUser) {
            throw new ConflictError({
                message: "User already exists!",
            });
        }

        const createdUser = await this.userRepository.create({
            email,
            name,
            password: HashAdapter.encrypt(password),
        });

        return {
            userId: createdUser.id,
            token: await this.createSession(createdUser.id, {
                email,
                password,
            }),
        };
    }

    async validateToken(token: string): Promise<string> {
        try {
            const payload = jwt.verify(token, Env.JwtSecretKey) as JwtPayload;
            return payload.id;
        } catch (err) {
            throw new UnauthorizedError({
                message: "User unauthenticated!",
            });
        }
    }
}

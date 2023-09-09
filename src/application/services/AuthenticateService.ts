import { autoInjectable, singleton } from "tsyringe";

import { HashAdapter } from "../../core/adapters/HashAdapter";
import { JwtAdapter } from "../../core/adapters/JwtAdapter";
import { ConflictError } from "../../core/errors/http/ConflictError";
import { UnauthorizedError } from "../../core/errors/http/UnauthorizedError";
import { SessionRepository } from "../../infrastructure/database/repositories/SessionRepository";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import { IPostUserSignIn } from "../dtos/IPostUserSignIn";
import { IPostUserSignUp } from "../dtos/IPostUserSignUp";

@singleton()
@autoInjectable()
export class AuthenticateService {
    constructor(
        private readonly jwtAdapter: JwtAdapter,
        private readonly hashAdapter: HashAdapter,
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
    ) {}

    async createSession(userId: string, payload: Record<string, string>) {
        const token = this.jwtAdapter.generate(payload, "2h");
        await this.sessionRepository.create(userId, token);
        return token;
    }

    async signIn({ email, password }: IPostUserSignIn) {
        const foundUser = await this.userRepository.findByEmail(email);

        if (!foundUser) {
            throw new UnauthorizedError({
                message: "User credentials are invalid!",
            });
        }

        const isCorrectPassword = this.hashAdapter.compare(password, foundUser.password);

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
            password: this.hashAdapter.encrypt(password),
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
            const payload = this.jwtAdapter.compare(token);
            return payload.id;
        } catch (err) {
            throw new UnauthorizedError({
                message: "User unauthenticated!",
            });
        }
    }
}

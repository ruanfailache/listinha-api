import { autoInjectable, singleton } from "tsyringe";

import { IPostUserSignIn } from "../../application/dtos/IPostUserSignIn";
import { HashAdapter } from "../../core/adapters/HashAdapter";
import { UnauthorizedError } from "../../core/errors/http/UnauthorizedError";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";

import { CreateSessionService } from "./CreateSessionService";

@singleton()
@autoInjectable()
export class AuthenticateService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createSessionUseCase: CreateSessionService,
    ) {}

    async execute({ email, password }: IPostUserSignIn) {
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
            token: await this.createSessionUseCase.execute(foundUser.id, {
                email,
                password,
            }),
        };
    }
}

import { autoInjectable, singleton } from "tsyringe";

import { IPostUserSignUp } from "../../application/dtos/IPostUserSignUp";
import { HashAdapter } from "../../core/adapters/HashAdapter";
import { ConflictError } from "../../core/errors/http/ConflictError";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import { CreateSessionUseCase } from "./CreateSessionUseCase";

@singleton()
@autoInjectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createSessionUseCase: CreateSessionUseCase,
    ) {}

    async execute({ email, name, password }: IPostUserSignUp) {
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
            token: await this.createSessionUseCase.execute(createdUser.id, {
                email,
                password,
            }),
        };
    }
}

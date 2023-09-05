import e from "express";
import { autoInjectable } from "tsyringe";

import { Controller } from "../../../core/protocols/Controller";
import { CreateUserUseCase } from "../../../domain/use-cases/create-user/CreateUserUseCase";
import { IPostUserSignUp } from "../../dtos/IPostUserSignUp";
import { PostUserSignUpValidator } from "../../validators/PostUserSignUpValidator";

@autoInjectable()
export class PostUserSignUpController extends Controller {
    constructor(
        private readonly postUserSignUpValidator: PostUserSignUpValidator,
        private readonly createUserUseCase: CreateUserUseCase,
    ) {
        super();
    }

    async handler(request: e.Request, response: e.Response): Promise<void> {
        const { email, password, name } = this.postUserSignUpValidator.validate<IPostUserSignUp>(request.body);

        const result = await this.createUserUseCase.execute({
            email,
            name,
            password,
        });

        response.send(result);
    }
}

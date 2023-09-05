import e from "express";
import { autoInjectable } from "tsyringe";

import { Controller } from "../../../core/protocols/Controller";
import { CreateUserUseCase } from "../../../domain/use-cases/create-user/CreateUserUseCase";
import { IPostUser } from "../../dtos/IPostUser";
import { PostUserValidator } from "../../validators/PostUserValidator";

@autoInjectable()
export class PostUserController extends Controller {
    constructor(
        private readonly postUserValidator: PostUserValidator,
        private readonly createUserUseCase: CreateUserUseCase,
    ) {
        super();
    }

    async handler(request: e.Request, response: e.Response): Promise<void> {
        const { email, password, name } = this.postUserValidator.validate<IPostUser>(request.body);

        const result = await this.createUserUseCase.execute({
            email,
            name,
            password,
        });

        response.send(result);
    }
}

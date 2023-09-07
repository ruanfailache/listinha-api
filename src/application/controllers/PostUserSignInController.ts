import e from "express";
import { autoInjectable } from "tsyringe";

import { Controller } from "@core/protocols/Controller";

import { AuthenticateUserUseCase } from "@domain/use-cases/AuthenticateUserUseCase";

import { IPostUserSignIn } from "../dtos/IPostUserSignIn";
import { PostUserSignInValidator } from "../validators/PostUserSignInValidator";

@autoInjectable()
export class PostUserSignInController extends Controller {
    constructor(
        private readonly postUserSignInValidator: PostUserSignInValidator,
        private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    ) {
        super();
    }

    async handler(request: e.Request, response: e.Response): Promise<void> {
        const validatorResult = this.postUserSignInValidator.validate<IPostUserSignIn>(request.body);
        const result = await this.authenticateUserUseCase.execute(validatorResult);
        response.status(201).send(result);
    }
}

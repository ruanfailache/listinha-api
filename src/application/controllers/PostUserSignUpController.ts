import e from "express";
import { autoInjectable } from "tsyringe";

import { Controller } from "../../core/protocols/Controller";
import { AuthenticateService } from "../../domain/services/AuthenticateService";
import { IPostUserSignUp } from "../dtos/IPostUserSignUp";
import { PostUserSignUpValidator } from "../validators/PostUserSignUpValidator";

@autoInjectable()
export class PostUserSignUpController extends Controller {
    constructor(
        private readonly postUserSignUpValidator: PostUserSignUpValidator,
        private readonly authenticateUserUseCase: AuthenticateService,
    ) {
        super();
    }

    async handler(request: e.Request, response: e.Response): Promise<void> {
        const validatorResult = this.postUserSignUpValidator.validate<IPostUserSignUp>(request.body);
        const result = await this.authenticateUserUseCase.signUp(validatorResult);
        response.status(201).send(result);
    }
}

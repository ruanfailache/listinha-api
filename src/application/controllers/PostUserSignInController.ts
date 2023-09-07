import e from "express";
import { autoInjectable } from "tsyringe";

import { Controller } from "../../core/protocols/Controller";
import { AuthenticateService } from "../../domain/services/AuthenticateService";
import { IPostUserSignIn } from "../dtos/IPostUserSignIn";
import { PostUserSignInValidator } from "../validators/PostUserSignInValidator";

@autoInjectable()
export class PostUserSignInController extends Controller {
    constructor(
        private readonly postUserSignInValidator: PostUserSignInValidator,
        private readonly authenticateUserUseCase: AuthenticateService,
    ) {
        super();
    }

    async handler(request: e.Request, response: e.Response): Promise<void> {
        const validatorResult = this.postUserSignInValidator.validate<IPostUserSignIn>(request.body);
        const result = await this.authenticateUserUseCase.signIn(validatorResult);
        response.status(201).send(result);
    }
}

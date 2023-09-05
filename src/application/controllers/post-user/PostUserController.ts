import e from "express";
import { autoInjectable } from "tsyringe";

import { Controller } from "../../../core/protocols/Controller";
import { CreateUserUseCase } from "../../../domain/use-cases/create-user/CreateUserUseCase";

@autoInjectable()
export class PostUserController extends Controller {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {
        super();
    }

    async handler(request: e.Request, response: e.Response): Promise<void> {
        const { email, name, password } = request.body;

        const result = await this.createUserUseCase.execute({
            email,
            name,
            password,
        });

        response.send(result);
    }
}

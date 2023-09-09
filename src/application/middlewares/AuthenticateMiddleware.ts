import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

import { UnauthorizedError } from "../../core/errors/http/UnauthorizedError";
import { Middleware } from "../../core/protocols/Middleware";
import { AuthenticateService } from "../services/AuthenticateService";

@autoInjectable()
export class AuthenticateMiddleware extends Middleware {
    constructor(private readonly authenticateService: AuthenticateService) {
        super();
    }

    async handler(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { authorization } = request.headers;

        if (!authorization) {
            throw new UnauthorizedError({
                message: "User unauthenticated!",
            });
        }

        const token = authorization.replace("Bearer ", "");

        const userId = await this.authenticateService.validateToken(token);

        request.user = {
            id: userId,
        };

        next();
    }
}

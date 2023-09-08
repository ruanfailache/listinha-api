import { NextFunction } from "express";
import { autoInjectable, singleton } from "tsyringe";

import { IHttpRequest } from "../../core/protocols/Controller";
import { AuthenticateService } from "../../domain/services/AuthenticateService";

@singleton()
@autoInjectable()
export class AuthenticateMiddleware {
    constructor(private readonly authenticateService: AuthenticateService) {}

    async middleware(request: IHttpRequest, response: Response, next: NextFunction): Promise<void> {
        const { authorization } = request.headers;

        const token = authorization?.replace("Bearer ", "");

        const userId = await this.authenticateService.validateToken(token);

        request.user = {
            id: userId,
        };

        next();
    }
}

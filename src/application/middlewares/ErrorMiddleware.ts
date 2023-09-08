import { NextFunction, Request, Response } from "express";

import { HttpError } from "../../core/protocols/HttpError";

export class ErrorMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    middleware(error: unknown, request: Request, response: Response, next: NextFunction): void {
        if (error instanceof HttpError) {
            response.status(error.statusCode).send({
                error: error.body ?? error.message,
            });
        }
        response.status(500).send();
    }
}

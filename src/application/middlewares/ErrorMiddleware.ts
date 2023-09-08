import { NextFunction, Response } from "express";
import { singleton } from "tsyringe"; // eslint-disable-next-line @typescript-eslint/no-unused-vars

import { IHttpRequest } from "../../core/protocols/Controller";
import { HttpError } from "../../core/protocols/HttpError";

@singleton()
export class ErrorMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    middleware(error: unknown, request: IHttpRequest, response: Response, next: NextFunction): void {
        if (error instanceof HttpError) {
            response.status(error.statusCode).send({
                error: error.body ?? error.message,
            });
        }
        response.status(500).send();
    }
}

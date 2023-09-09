import { ErrorRequestHandler } from "express";

import { HttpError } from "../../core/protocols/HttpError";

export class ErrorMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    middleware: ErrorRequestHandler = (error: unknown, request, response, next): void => {
        if (error instanceof HttpError) {
            response.status(error.statusCode).send({
                error: error.body ?? error.message,
            });
        }
        response.status(500).send();
    };
}

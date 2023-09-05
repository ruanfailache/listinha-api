import {ErrorRequestHandler} from "express";

import {HttpError} from "../../core/protocols/HttpError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof HttpError) {
        response.status(error.statusCode).send({
            message: error.message,
        });
    }
    response.status(500).send();
};

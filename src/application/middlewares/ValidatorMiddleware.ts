import { RequestHandler } from "express";
import { SafeParseReturnType } from "zod";

import { BadRequestError } from "../../core/errors/http/BadRequestError";
import { Validator } from "../../core/protocols/Validator";

export const ValidatorMiddleware = <T extends Validator>(validator: T): RequestHandler => {
    return (request, response, next) => {
        let validatorResult: SafeParseReturnType<T, T>;

        if (request.method === "GET") {
            validatorResult = validator.validate(request.query);
        } else {
            validatorResult = validator.validate(request.body);
        }

        if (!validatorResult.success) {
            const formattedErrorMessage = validatorResult.error.errors
                .map((e) => `${e.path}: "${e.message}"`)
                .join(", ");

            throw new BadRequestError(`{${formattedErrorMessage}}`);
        }

        next();
    };
};

import { ZodType } from "zod";

import { BadRequestError } from "../errors/http/BadRequestError";

export abstract class Validator {
    abstract schema(): ZodType;

    validate<T>(data: unknown): T {
        const validatorResult = this.schema().safeParse(data);

        if (!validatorResult.success) {
            throw new BadRequestError({
                body: validatorResult.error.formErrors.fieldErrors,
            });
        }

        return validatorResult.data;
    }
}

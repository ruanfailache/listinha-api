import { ZodType } from "zod";

export abstract class Validator {
    abstract schema(): ZodType;

    validate(data: unknown) {
        return this.schema().safeParse(data);
    }
}

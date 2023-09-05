import { z } from "zod";

import { Validator } from "../../core/protocols/Validator";

export class PostUserValidator extends Validator {
    schema(): z.ZodType {
        return z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string(),
        });
    }
}

import { singleton } from "tsyringe";
import { z } from "zod";

import { Validator } from "../../core/protocols/Validator";

@singleton()
export class PostUserValidator extends Validator {
    schema(): z.ZodType {
        return z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string(),
        });
    }
}

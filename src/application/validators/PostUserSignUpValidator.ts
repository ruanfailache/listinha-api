import { singleton } from "tsyringe";
import { z } from "zod";

import { Validator } from "../../core/protocols/Validator";

@singleton()
export class PostUserSignUpValidator extends Validator {
    schema(): z.ZodType {
        return z.object({
            email: z.string().email().trim().toLowerCase(),
            name: z.string().trim().min(1),
            password: z.string().min(6, "Password must have at least 6 characters"),
        });
    }
}

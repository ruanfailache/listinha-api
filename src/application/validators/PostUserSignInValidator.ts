import { singleton } from "tsyringe";
import { z } from "zod";

import { Validator } from "../../core/protocols/Validator";

@singleton()
export class PostUserSignInValidator extends Validator {
    schema(): z.ZodType {
        return z.object({
            email: z.string().email().trim().toLowerCase(),
            password: z.string().min(1, "Password should not be empty!"),
        });
    }
}

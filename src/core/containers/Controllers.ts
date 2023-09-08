import { container } from "tsyringe";

import { PostUserSignInController } from "../../application/controllers/PostUserSignInController";
import { PostUserSignUpController } from "../../application/controllers/PostUserSignUpController";

export const Controllers = {
    PostUserSignIn: container.resolve(PostUserSignInController),
    PostUserSignUp: container.resolve(PostUserSignUpController),
} as const;

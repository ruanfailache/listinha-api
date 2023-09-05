import { Router } from "express";
import { container } from "tsyringe";

import { PostUserSignInController } from "../../../application/controllers/post-user-sign-in/PostUserSignInController";
import { PostUserSignUpController } from "../../../application/controllers/post-user-sign-up/PostUserSignUpController";

const UserRouter = Router();

UserRouter.post("/sign-in", container.resolve(PostUserSignInController).route);
UserRouter.post("/sign-up", container.resolve(PostUserSignUpController).route);

export { UserRouter };

import { Router } from "express";
import { container } from "tsyringe";

import { PostUserSignInController } from "@application/controllers/PostUserSignInController";
import { PostUserSignUpController } from "@application/controllers/PostUserSignUpController";

const UserRouter = Router();

UserRouter.post("/sign-in", container.resolve(PostUserSignInController).route);
UserRouter.post("/sign-up", container.resolve(PostUserSignUpController).route);

export { UserRouter };

import { Router } from "express";
import { container } from "tsyringe";

import { PostUserSignUpController } from "../../../application/controllers/post-user-sign-up/PostUserSignUpController";

const UserRouter = Router();

UserRouter.post("/sign-up", container.resolve(PostUserSignUpController).route);

export { UserRouter };

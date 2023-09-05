import { Router } from "express";
import { container } from "tsyringe";

import { PostUserController } from "../../../application/controllers/post-user/PostUserController";

const UserRouter = Router();

UserRouter.post("/", container.resolve(PostUserController).route);

export { UserRouter };

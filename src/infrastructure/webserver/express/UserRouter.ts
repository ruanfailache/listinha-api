import { Router } from "express";
import { container } from "tsyringe";

import { PostUserController } from "../../../application/controllers/post-user/PostUserController";
import { ValidatorMiddleware } from "../../../application/middlewares/ValidatorMiddleware";
import { PostUserValidator } from "../../../application/validators/PostUserValidator";

export default Router().post(
    "/",
    ValidatorMiddleware(new PostUserValidator()),
    container.resolve(PostUserController).route,
);

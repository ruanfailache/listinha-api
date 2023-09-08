import { Router } from "express";

import { Controllers } from "../../../core/containers/controllers";

const UserRouter = Router();

UserRouter.post("/sign-in", Controllers.PostUserSignIn.route);
UserRouter.post("/sign-up", Controllers.PostUserSignUp.route);

export { UserRouter };

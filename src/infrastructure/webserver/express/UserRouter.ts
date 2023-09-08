import { Router } from "express";

import { Controllers } from "../../../core/containers/Controllers";

const UserRouter = Router();

UserRouter.post("/sign-in", Controllers.PostUserSignIn.route);
UserRouter.post("/sign-up", Controllers.PostUserSignUp.route);

export { UserRouter };

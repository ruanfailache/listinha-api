import e from "express";

import UserRouter from "./UserRouter";

const Router = e.Router();

Router.use("/user", UserRouter);

export { Router };

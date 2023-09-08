import { container } from "tsyringe";

import { AuthenticateMiddleware } from "../../application/middlewares/AuthenticateMiddleware";
import { ErrorMiddleware } from "../../application/middlewares/ErrorMiddleware";

export const Middlewares = {
    Error: container.resolve(ErrorMiddleware),
    Authenticate: container.resolve(AuthenticateMiddleware),
} as const;

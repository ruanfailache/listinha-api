import { Request, RequestHandler, Response } from "express";

export abstract class Controller {
    abstract handler(request: Request, response: Response): Promise<void>;

    route: RequestHandler = async (request, response, next) => {
        try {
            await this.handler(request, response);
        } catch (err) {
            next(err);
        }
    };
}

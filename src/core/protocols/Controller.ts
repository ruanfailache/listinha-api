import { NextFunction, Request, Response } from "express";

export interface IHttpRequest extends Request {
    user?: {
        id: string;
    };
}

export abstract class Controller {
    abstract handler(request: IHttpRequest, response: Response): Promise<void>;

    async route(request: IHttpRequest, response: Response, next: NextFunction): Promise<void> {
        try {
            await this.handler(request, response);
        } catch (err) {
            next(err);
        }
    }
}

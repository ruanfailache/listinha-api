import e from "express";

export abstract class Middleware {
    abstract handler(request: e.Request, response: e.Response, next: e.NextFunction): Promise<void>;

    middleware: e.RequestHandler = async (request, response, next): Promise<void> => {
        try {
            await this.handler(request, response, next);
        } catch (err) {
            next(err);
        }
    };
}

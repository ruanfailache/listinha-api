import { HttpError } from "../../protocols/HttpError";

export class UnauthorizedError extends HttpError {
    readonly statusCode: number = 401;
}

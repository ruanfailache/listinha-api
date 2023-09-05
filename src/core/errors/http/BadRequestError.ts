import { HttpError } from "../../protocols/HttpError";

export class BadRequestError extends HttpError {
    readonly statusCode: number = 400;
}

import { HttpError } from "../../protocols/HttpError";

export class ConflictError extends HttpError {
    readonly statusCode: number = 409;
}

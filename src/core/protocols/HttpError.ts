export abstract class HttpError extends Error {
    abstract readonly statusCode: number;
}

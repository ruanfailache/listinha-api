interface IHttpError {
    message?: string;
    body?: Record<string, unknown>;
}

export abstract class HttpError extends Error {
    abstract readonly statusCode: number;

    body?: Record<string, unknown>;

    constructor({ message, body }: IHttpError) {
        if (message && body) {
            throw new Error("Invalid HttpError params!");
        }

        super(message);

        this.body = body;
    }
}

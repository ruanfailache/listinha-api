interface User {
    id: string;
}

declare namespace Express {
    interface Request {
        user?: User;
    }
}

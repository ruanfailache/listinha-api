import { SessionModel } from "../../infrastructure/database/models/SessionModel";

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    session: SessionModel;
}

import { singleton } from "tsyringe";

import { SessionModel } from "../models/SessionModel";

@singleton()
export class SessionRepository {
    async create(token: string): Promise<SessionModel> {
        const session = await SessionModel.create({ token });
        return session.save();
    }
}

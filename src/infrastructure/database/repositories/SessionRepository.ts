import { sessions } from "@prisma/client";
import { autoInjectable, singleton } from "tsyringe";

import { PrismaDatabase } from "../config/PrismaDatabase";

@singleton()
@autoInjectable()
export class SessionRepository {
    constructor(private database: PrismaDatabase) {}

    async create(userId: string, token: string): Promise<sessions> {
        return this.database.client.sessions.create({
            data: {
                token,
                userId,
            },
        });
    }
}

import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class PrismaDatabase {
    client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    static async clearDatabase() {
        const client = new PrismaClient();

        await client.$queryRaw`
            TRUNCATE sessions, 
                     users
            CASCADE;
        `;
    }
}

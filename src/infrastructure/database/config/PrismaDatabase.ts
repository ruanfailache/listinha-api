import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class PrismaDatabase {
    client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }
}

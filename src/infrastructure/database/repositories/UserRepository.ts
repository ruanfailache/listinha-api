import { users } from "@prisma/client";
import { singleton } from "tsyringe";

import { ICreateUser } from "../../../domain/entities/User";
import { PrismaDatabase } from "../config/PrismaDatabase";

@singleton()
export class UserRepository {
    constructor(private database: PrismaDatabase) {}

    async findByEmail(email: string): Promise<users | null> {
        return this.database.client.users.findUnique({
            where: { email },
        });
    }

    async create({ email, name, password }: ICreateUser): Promise<users> {
        return this.database.client.users.create({
            data: {
                email,
                name,
                password,
            },
        });
    }
}

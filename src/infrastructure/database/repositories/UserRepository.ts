import { singleton } from "tsyringe";

import { ICreateUser } from "../../../domain/entities/User";
import { SessionModel } from "../models/SessionModel";
import { UserModel } from "../models/UserModel";

@singleton()
export class UserRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: {
                email,
            },
        });
    }

    async create({ email, name, password }: ICreateUser): Promise<UserModel> {
        const user = await UserModel.create({
            email,
            name,
            password,
        });

        return user.save();
    }

    async updateSession(userId: string, session: SessionModel): Promise<void> {
        await UserModel.update(
            {
                session,
            },
            {
                where: {
                    id: userId,
                },
            },
        );
    }
}

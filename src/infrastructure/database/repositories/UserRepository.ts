import { singleton } from "tsyringe";

import { ICreateUser } from "../../../domain/entities/User";
import { UserModel } from "../models/UserModel";

@singleton()
export class UserRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: { email },
        });
    }

    async create({ email, name, password, session }: ICreateUser): Promise<UserModel> {
        const user = await UserModel.create({
            email,
            name,
            password,
            sessions: [session],
        });

        return user.save();
    }
}

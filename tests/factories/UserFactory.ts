import { faker } from "@faker-js/faker/locale/pt_BR";
import { container } from "tsyringe";

import { HashAdapter } from "../../src/core/adapters/HashAdapter";
import { ICreateUser } from "../../src/domain/entities/User";
import { UserModel } from "../../src/infrastructure/database/models/UserModel";
import { UserRepository } from "../../src/infrastructure/database/repositories/UserRepository";

export class UserFactory {
    private constructor() {}

    static create({ email, name, password }: Partial<ICreateUser>): Promise<UserModel> {
        const fakeEmail = email ?? faker.internet.email();
        const fakeName = name ?? faker.person.fullName();
        const fakePassword = password ?? faker.internet.password();

        return container.resolve(UserRepository).create({
            email: fakeEmail,
            name: fakeName,
            password: HashAdapter.encrypt(fakePassword),
        });
    }
}

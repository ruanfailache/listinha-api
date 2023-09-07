import { faker } from "@faker-js/faker/locale/pt_BR";
import { users } from "@prisma/client";
import { container } from "tsyringe";

import { HashAdapter } from "../../src/core/adapters/HashAdapter";
import { ICreateUser } from "../../src/domain/entities/User";
import { UserRepository } from "../../src/infrastructure/database/repositories/UserRepository";

export class UserFactory {
    private constructor() {}

    static create(params?: Partial<ICreateUser>): Promise<users> {
        const fakeEmail = params?.email ?? faker.internet.email();
        const fakeName = params?.name ?? faker.person.fullName();
        const fakePassword = params?.password ?? faker.internet.password();

        return container.resolve(UserRepository).create({
            email: fakeEmail,
            name: fakeName,
            password: HashAdapter.encrypt(fakePassword),
        });
    }
}

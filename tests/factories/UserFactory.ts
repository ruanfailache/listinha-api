import { faker } from "@faker-js/faker/locale/pt_BR";
import { users } from "@prisma/client";
import { container } from "tsyringe";

import { IPostUserSignUp } from "../../src/application/dtos/IPostUserSignUp";
import { HashAdapter } from "../../src/core/adapters/HashAdapter";
import { UserRepository } from "../../src/infrastructure/database/repositories/UserRepository";

export class UserFactory {
    private constructor() {}

    static create(params?: Partial<IPostUserSignUp>): Promise<users> {
        const fakeEmail = params?.email ?? faker.internet.email();
        const fakeName = params?.name ?? faker.person.fullName();
        const fakePassword = params?.password ?? faker.internet.password();

        return container.resolve(UserRepository).create({
            email: fakeEmail,
            name: fakeName,
            password: HashAdapter.encrypt(fakePassword),
        });
    }

    static getFakeUser(params?: Partial<users>): users {
        return {
            id: faker.string.uuid(),
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
            createdAt: faker.date.recent({ days: 10 }),
            updatedAt: faker.date.recent({ days: 3 }),
            isActivated: faker.datatype.boolean(),
            addressId: null,
            ...params,
        };
    }
}

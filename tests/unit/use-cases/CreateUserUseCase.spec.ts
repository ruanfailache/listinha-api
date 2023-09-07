import { faker } from "@faker-js/faker/locale/pt_BR";
import { container } from "tsyringe";

import { HashAdapter } from "../../../src/core/adapters/HashAdapter";
import { ConflictError } from "../../../src/core/errors/http/ConflictError";
import { CreateSessionUseCase } from "../../../src/domain/use-cases/CreateSessionUseCase";
import { CreateUserUseCase } from "../../../src/domain/use-cases/CreateUserUseCase";
import { UserRepository } from "../../../src/infrastructure/database/repositories/UserRepository";

describe("CreateUserUseCase", () => {
    const userRepository = container.resolve(UserRepository);
    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const sut = new CreateUserUseCase(userRepository, createSessionUseCase);

    test("Should ensure throws ConflictError on email already registered", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce({
            id: faker.string.uuid(),
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        try {
            await sut.execute({
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: faker.internet.password(),
            });
            fail("Should throw ConflictError!");
        } catch (err) {
            expect(userRepository.findByEmail).toHaveBeenCalled();
            expect(err).toBeInstanceOf(ConflictError);
        }
    });

    test("Should ensure return correct values", async () => {
        const userId = faker.string.uuid();
        const token = faker.string.uuid();

        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);

        jest.spyOn(HashAdapter, "encrypt").mockReturnValueOnce(faker.string.uuid());

        jest.spyOn(userRepository, "create").mockResolvedValueOnce({
            id: userId,
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        jest.spyOn(createSessionUseCase, "execute").mockResolvedValueOnce(token);

        const res = await sut.execute({
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        expect(HashAdapter.encrypt).toHaveBeenCalled();
        expect(userRepository.create).toHaveBeenCalled();
        expect(createSessionUseCase.execute).toHaveBeenCalled();
        expect(res.token).toBe(token);
        expect(res.userId).toBe(userId);
    });
});

import { faker } from "@faker-js/faker/locale/pt_BR";
import { container } from "tsyringe";

import { HashAdapter } from "../../../src/core/adapters/HashAdapter";
import { UnauthorizedError } from "../../../src/core/errors/http/UnauthorizedError";
import { AuthenticateService } from "../../../src/domain/services/AuthenticateService";
import { CreateSessionService } from "../../../src/domain/services/CreateSessionService";
import { UserRepository } from "../../../src/infrastructure/database/repositories/UserRepository";
import { UserFactory } from "../../factories/UserFactory";

describe("AuthenticateService", () => {
    const userRepository = container.resolve(UserRepository);
    const createSessionUseCase = container.resolve(CreateSessionService);

    const sut = new AuthenticateService(userRepository, createSessionUseCase);

    test("Should ensure throws UnauthorizedError on email not registered", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);

        try {
            await sut.execute({
                email: faker.internet.email(),
                password: faker.internet.password(),
            });
            fail("Should throw UnauthorizedError!");
        } catch (err) {
            expect(userRepository.findByEmail).toHaveBeenCalled();
            expect(err).toBeInstanceOf(UnauthorizedError);
        }
    });

    test("Should ensure validate provided password", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(UserFactory.getFakeUser());

        jest.spyOn(HashAdapter, "compare").mockReturnValueOnce(false);

        try {
            await sut.execute({
                email: faker.internet.email(),
                password: faker.internet.password(),
            });
            fail("Should throw UnauthorizedError!");
        } catch (err) {
            expect(HashAdapter.compare).toHaveBeenCalled();
            expect(err).toBeInstanceOf(UnauthorizedError);
        }
    });

    test("Should ensure return correct values", async () => {
        const userId = faker.string.uuid();
        const token = faker.string.uuid();

        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(
            UserFactory.getFakeUser({
                id: userId,
            }),
        );

        jest.spyOn(HashAdapter, "compare").mockReturnValueOnce(true);

        jest.spyOn(createSessionUseCase, "execute").mockResolvedValueOnce(token);

        const res = await sut.execute({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

        expect(createSessionUseCase.execute).toHaveBeenCalled();
        expect(res.token).toBe(token);
        expect(res.userId).toBe(userId);
    });
});

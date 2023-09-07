import { faker } from "@faker-js/faker/locale/pt_BR";
import jwt from "jsonwebtoken";
import { container } from "tsyringe";

import { CreateSessionUseCase } from "../../../src/domain/use-cases/CreateSessionUseCase";
import { SessionRepository } from "../../../src/infrastructure/database/repositories/SessionRepository";

describe("CreateSessionUseCase", () => {
    const sessionRepository = container.resolve(SessionRepository);

    const sut = new CreateSessionUseCase(sessionRepository);

    test("Should ensure return correct values", async () => {
        jest.spyOn(sessionRepository, "create").mockResolvedValueOnce({
            id: faker.string.uuid(),
            token: faker.string.uuid(),
            userId: faker.string.uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        jest.spyOn(jwt, "sign").mockReturnValueOnce();

        const res = await sut.execute(faker.string.uuid(), {});

        expect(sessionRepository.create).toHaveBeenCalled();
        expect(jwt.sign).toHaveBeenCalled();
        expect(res).toBeDefined();
    });
});

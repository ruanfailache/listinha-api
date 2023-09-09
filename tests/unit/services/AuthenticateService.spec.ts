import { faker } from "@faker-js/faker/locale/pt_BR";
import { fail } from "assert";
import jwt from "jsonwebtoken";
import { describe } from "node:test";
import { container } from "tsyringe";

import { AuthenticateService } from "../../../src/application/services/AuthenticateService";
import { HashAdapter } from "../../../src/core/adapters/HashAdapter";
import { ConflictError } from "../../../src/core/errors/http/ConflictError";
import { UnauthorizedError } from "../../../src/core/errors/http/UnauthorizedError";
import { SessionRepository } from "../../../src/infrastructure/database/repositories/SessionRepository";
import { UserRepository } from "../../../src/infrastructure/database/repositories/UserRepository";
import { UserFactory } from "../../factories/UserFactory";

describe("AuthenticateService", () => {
    const userRepository = container.resolve(UserRepository);
    const sessionRepository = container.resolve(SessionRepository);

    const sut = new AuthenticateService(userRepository, sessionRepository);

    function mockCreateSession() {
        const token = faker.string.uuid();
        jest.spyOn(sut, "createSession").mockResolvedValue(token);
        return token;
    }

    describe("createSession", () => {
        jest.spyOn(jwt, "sign").mockReturnValue();

        jest.spyOn(sessionRepository, "create").mockResolvedValue({
            id: faker.string.uuid(),
            token: faker.string.uuid(),
            userId: faker.string.uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        test("Should ensure create session correctly", async () => {
            const res = await sut.createSession(faker.string.uuid(), {});

            expect(sessionRepository.create).toHaveBeenCalled();
            expect(jwt.sign).toHaveBeenCalled();
            expect(res).toBeDefined();
        });
    });

    describe("signIn", () => {
        test("Should ensure throws UnauthorizedError on email not registered", async () => {
            jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);

            try {
                await sut.signIn({
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
                await sut.signIn({
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                });
                fail("Should throw UnauthorizedError!");
            } catch (err) {
                expect(HashAdapter.compare).toHaveBeenCalled();
                expect(err).toBeInstanceOf(UnauthorizedError);
            }
        });

        test("Should ensure returns correctly on sign in", async () => {
            const userId = faker.string.uuid();

            jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(
                UserFactory.getFakeUser({
                    id: userId,
                }),
            );

            jest.spyOn(HashAdapter, "compare").mockReturnValueOnce(true);

            const token = mockCreateSession();

            const res = await sut.signIn({
                email: faker.internet.email(),
                password: faker.internet.password(),
            });

            expect(sut.createSession).toHaveBeenCalled();
            expect(res.token).toBe(token);
            expect(res.userId).toBe(userId);
        });
    });

    describe("signUp", () => {
        test("Should ensure throws ConflictError on email already registered", async () => {
            jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(UserFactory.getFakeUser());

            try {
                await sut.signUp({
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

        test("Should ensure returns correctly on sign up", async () => {
            const userId = faker.string.uuid();

            jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);

            jest.spyOn(HashAdapter, "encrypt").mockReturnValueOnce(faker.string.uuid());

            jest.spyOn(userRepository, "create").mockResolvedValueOnce(
                UserFactory.getFakeUser({
                    id: userId,
                }),
            );

            const token = mockCreateSession();

            const res = await sut.signUp({
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: faker.internet.password(),
            });

            expect(HashAdapter.encrypt).toHaveBeenCalled();
            expect(userRepository.create).toHaveBeenCalled();
            expect(sut.createSession).toHaveBeenCalled();
            expect(res.token).toBe(token);
            expect(res.userId).toBe(userId);
        });
    });

    describe("validateToken", () => {
        test("Should ensure throws UnauthorizedError on invalid token", async () => {
            jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
                throw new Error();
            });
            try {
                await sut.validateToken(faker.string.uuid());
                fail("Should throws UnauthorizedError!");
            } catch (err) {
                expect(err).toBeInstanceOf(UnauthorizedError);
            }
        });

        test("Should ensure returns correctly on validateToken", async () => {
            const payload = {
                id: faker.string.uuid(),
            };

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => payload);

            const result = await sut.validateToken(faker.string.uuid());

            expect(result).toBe(payload.id);
        });
    });
});

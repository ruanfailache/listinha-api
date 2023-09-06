import { faker } from "@faker-js/faker/locale/pt_BR";
import supertest from "supertest";
import { container } from "tsyringe";

import app from "../../src/app";
import { UserRepository } from "../../src/infrastructure/database/repositories/UserRepository";

describe("POST /user/sign-up", () => {
    it("Should ensure throws BadRequestError on empty email", async () => {
        const response = await supertest(app).post("/user/sign-up").send({
            email: "",
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws BadRequestError on invalid email", async () => {
        const response = await supertest(app).post("/user/sign-up").send({
            email: faker.lorem.words(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws BadRequestError on empty password", async () => {
        const response = await supertest(app).post("/user/sign-up").send({
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: "",
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws BadRequestError on empty name", async () => {
        const response = await supertest(app).post("/user/sign-up").send({
            email: faker.internet.email(),
            name: "",
            password: faker.internet.password(),
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws ConflictError on registered email", async () => {
        const fakeEmail = faker.internet.email();

        await container.resolve(UserRepository).create({
            email: fakeEmail,
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        const response = await supertest(app).post("/user/sign-up").send({
            email: fakeEmail,
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(409);
    });

    it("Should ensure returns correct values on success", async () => {
        const fakeEmail = faker.internet.email();
        const fakeName = faker.person.fullName();
        const fakePassword = faker.internet.password();

        const response = await supertest(app).post("/user/sign-up").send({
            email: fakeEmail,
            name: fakeName,
            password: fakePassword,
        });

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.userId).toBeDefined();
        expect(response.body.token).toBeDefined();
    });
});

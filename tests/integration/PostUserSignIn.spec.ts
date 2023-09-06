import { faker } from "@faker-js/faker/locale/pt_BR";
import supertest from "supertest";

import app from "../../src/app";
import { UserFactory } from "../factories/UserFactory";

describe("POST /user/sign-in", () => {
    it("Should ensure throws BadRequestError on empty email", async () => {
        const response = await supertest(app).post("/user/sign-in").send({
            email: "",
            password: faker.internet.password(),
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws BadRequestError on invalid email", async () => {
        const response = await supertest(app).post("/user/sign-in").send({
            email: faker.lorem.words(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws BadRequestError on empty password", async () => {
        const response = await supertest(app).post("/user/sign-in").send({
            email: faker.internet.email(),
            password: "",
        });

        expect(response.status).toBe(400);
    });

    it("Should ensure throws UnauthorizedError on invalid email", async () => {
        const response = await supertest(app).post("/user/sign-in").send({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(401);
    });

    it("Should ensure throws UnauthorizedError on invalid password", async () => {
        const fakeEmail = faker.internet.email();

        await UserFactory.create({
            email: fakeEmail,
        });

        const response = await supertest(app).post("/user/sign-in").send({
            email: fakeEmail,
            password: faker.internet.password(),
        });

        expect(response.status).toBe(401);
    });

    it("Should ensure returns correct values on success", async () => {
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password();

        await UserFactory.create({
            email: fakeEmail,
            password: fakePassword,
        });

        const response = await supertest(app).post("/user/sign-in").send({
            email: fakeEmail,
            password: fakePassword,
        });

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.userId).toBeDefined();
        expect(response.body.token).toBeDefined();
    });
});

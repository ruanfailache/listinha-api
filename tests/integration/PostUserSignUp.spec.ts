import { faker } from "@faker-js/faker/locale/pt_BR";
import supertest from "supertest";

import { PrismaDatabase } from "@infrastructure/database/config/PrismaDatabase";

import { UserFactory } from "../factories/UserFactory";

import app from "@listinha/app";

afterAll(PrismaDatabase.clearDatabase);

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
        const createdUser = await UserFactory.create();

        const response = await supertest(app).post("/user/sign-up").send({
            email: createdUser.email,
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(409);
    });

    it("Should ensure returns correct values on success", async () => {
        const response = await supertest(app).post("/user/sign-up").send({
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.userId).toBeDefined();
        expect(response.body.token).toBeDefined();
    });
});

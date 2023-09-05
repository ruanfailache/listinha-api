import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express from "express";

import { ErrorMiddleware } from "./application/middlewares/ErrorMiddleware";
import { Env } from "./core/constants/env";
import { Router } from "./infrastructure/webserver/express/Router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);
app.use(ErrorMiddleware);

app.listen(Env.ApiPort, () => {
    console.log(`Server running at ${Env.ApiPort}`);
});

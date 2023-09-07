import cors from "cors";
import express from "express";

import { ErrorMiddleware } from "./application/middlewares/ErrorMiddleware";
import { Router } from "./infrastructure/webserver/express/Router";

const app = express();

app.use(cors());
app.use(express.json());

app.use(Router);

app.use(ErrorMiddleware);

export default app;

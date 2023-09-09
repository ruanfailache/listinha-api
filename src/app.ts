import cors from "cors";
import express from "express";

import { Middlewares } from "./core/containers/Middlewares";
import { Router } from "./infrastructure/webserver/express/Router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", Router);

app.use(Middlewares.Error.middleware);

export default app;

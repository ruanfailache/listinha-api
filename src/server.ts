import "reflect-metadata";
import "dotenv/config";

import app from "./app";
import { Env } from "./core/constants/env";

app.listen(Env.ApiPort, () => {
    console.log(`Server running at ${Env.ApiPort}`);
});

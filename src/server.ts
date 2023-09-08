import "dotenv/config";
import "reflect-metadata";

import app from "./app";

app.listen(process.env.API_PORT, () => {
    console.log(`Server running at ${process.env.API_PORT}`);
});

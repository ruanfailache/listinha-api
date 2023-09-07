import "reflect-metadata";
import "dotenv/config";

import app from "./app";

app.listen(process.env.API_PORT, () => {
    console.log(`Server running at ${process.env.API_PORT}`);
});

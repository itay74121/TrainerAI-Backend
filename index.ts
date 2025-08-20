import { config } from "dotenv";
config();
import { Express } from "express-serve-static-core";
import { createApp } from "./createApp";
const app: Express = createApp();

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});

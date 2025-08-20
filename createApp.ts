import express from "express";
import cors from "cors";
import { Authorization } from "./util/Authentication";
import AgentRouter from "./routes/AgentRoute";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();
// import https from "https";
// import fs from "fs";

export function createApp(): express.Express {
    const app: express.Express = express();
    app.use(cors());
    app.use(express.json());
    // app.use(CheckConnection)
    // app.use(LogRequest)
    app.use(Authorization);
    // app.use(LogMessages)
    app.use(AgentRouter);
    // app.use("/OldConvo",OldConvoRouter);
    // https.createServer({
    //     key: fs.readFileSync("./server.key"),
    //     cert: fs.readFileSync("server.crt"),
    //   },app).listen(5000, () => {
    //     console.log('Server is running on port 5000');
    // });
    return app;
}
export function createNewToken():string{
    return jwt.sign({
        uid:"fakeuid",
        disclaimer:"test token only"
    },process.env.ACCESS_TOKEN_SECRET as string,{
        algorithm:"HS256",
        expiresIn:60*1000,

    })
}
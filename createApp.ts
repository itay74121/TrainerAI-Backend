import express from "express";
import cors from "cors";
import { Authorization } from "./util/Authentication";
import APIRouter from './routes/ApiRoute'
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
import { verifyFirebaseIdToken } from "./controller/Auth";
config();
// import https from "https";
// import fs from "fs";

export function createApp(): express.Express {
    const app: express.Express = express();
    app.use(cors());
    app.use(express.json());
    // app.use(CheckConnection)
    // app.use(LogRequest)
    app.use(verifyFirebaseIdToken);
    // app.use(LogMessages)
    app.use(APIRouter);
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
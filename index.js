import {config} from 'dotenv';
config();
import express from 'express';
import AskAIrouter from './routes/AskAI.js';
import OldConvoRouter from './routes/OldConvo.js';
const app = express();
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import { Authorization } from './util/Authentication.js';
import { CheckConnection, LogMessages, LogRequest } from './mongo/mongoutil.js';


app.use(cors());
app.use(express.json());
app.use(CheckConnection)
app.use(LogRequest)
app.use(Authorization)
app.use(LogMessages)
app.use('/AskAI', AskAIrouter);
app.use("/OldConvo",OldConvoRouter);


app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

https.createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("server.crt"),
  },app).listen(5000, () => {
    console.log('Server is running on port 5000');
});
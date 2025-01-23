import {config} from 'dotenv';
config();
import express from 'express';
import AskAIrouter from './routes/AskAI.js';
const app = express();
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use('/AskAI', AskAIrouter);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


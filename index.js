import dotenv from 'dotenv';
import express from 'express';
import AskAIrouter from './routes/AskAI.js';
import cors from 'cors';
dotenv.config();


const app = express();

app.use(cors()); // Add this line to use the cors middleware
app.use(express.json());
app.use('/AskAI', AskAIrouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
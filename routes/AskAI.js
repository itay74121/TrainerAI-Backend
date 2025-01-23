import dotenv from 'dotenv';
dotenv.config();
import express, { response } from 'express';
const router = express.Router();
import axios from 'axios';
import cors from 'cors';



router.use(cors()); // Add this line to use the cors middleware

router.post('/Question', async (req, res) => {
  let body = req.body
  AskAI({
    messages: body.messages,
    model: body.model
  }).then((response) => {
    res.send(response)
  })
});

async function AskAI({ messages , model}) {
  // Add user's message to state immediately
  try {
      const response = await axios.post(`http://${process.env.OLLAMA_IP}:11434/api/chat`, {
          model: model,
          messages: messages,
          stream: false,
      });
      return response.data; // Return the response data
  } catch (error) {
      console.error(error);
      throw error; // Throw the error to be caught in the calling function
  }
}

export default router;
require("dotenv").config()
const express = require('express');
const router = express.Router();
import OpenAI from "openai";
//const OpenAI = require("openai")

const openai= new OpenAI(process.env.OPENAI_API_KEY)

router.get('/Question', async (req, res) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Write a haiku about programming."
              }
            ]
          }
        ]
      });
    res.send(response);
});

exports.AskAIrouter = router;
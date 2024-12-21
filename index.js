const express = require('express');
const app = express();

const { AskAIrouter } = require('./routes/AskAI');

app.use('/AskAI', AskAIrouter);

app.listen(3000, () => {

});
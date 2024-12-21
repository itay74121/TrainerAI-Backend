const express = require('express');
const router = express.Router();


router.get('/Question', (req, res) => {
    res.send('AskAI Question');
});

exports.AskAIrouter = router;
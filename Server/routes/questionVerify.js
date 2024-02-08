const express = require('express');
const router = express.Router();
const answerSubmitController = require('../controllers/answerSubmitController')

router.post('/submit-answer', answerSubmitController)
    .get('/submit-answer', (req, res) => res.status(400).json({ error: "Method GET not allowed. Try POST request." }));;

module.exports = router;
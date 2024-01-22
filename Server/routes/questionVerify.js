const express = require('express');
const router = express.Router();
const answerSubmitController = require('../controllers/answerSubmitController')

router.post('/submit-answer', answerSubmitController);

module.exports = router;
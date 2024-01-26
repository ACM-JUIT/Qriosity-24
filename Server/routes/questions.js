const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

router.get('/api/questions', questionsController);

module.exports = router;
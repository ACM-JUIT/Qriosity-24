const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.post('/signup', signupController)
    .get('/signup', (req, res) => res.status(400).json({ error: "Method GET not allowed. Try POST request." }));

module.exports = router;
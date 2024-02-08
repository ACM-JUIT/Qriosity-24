const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

router.post('/refresh', refreshTokenController)
    .get('/refresh', (req, res) => res.status(400).json({ error: "Method GET not allowed. Try POST request." }));;

module.exports = router;
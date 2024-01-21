const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.get('/leaderboard', leaderboardController);

module.exports = router;

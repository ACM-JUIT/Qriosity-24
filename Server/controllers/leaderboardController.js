const User = require('../models/user');

const leaderboardController = async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ points: -1 });

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = leaderboardController;

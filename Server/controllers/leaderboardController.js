// Import necessary modules
const User = require('../models/user');

// Define the leaderboard controller as an asynchronous function
const leaderboardController = async (req, res) => {
    try {
        // Fetch the leaderboard by finding all users and sorting by points in descending order
        const leaderboard = await User.find().sort({ points: -1 });

        // Respond with the leaderboard data
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the leaderboard controller for use in other modules
module.exports = leaderboardController;

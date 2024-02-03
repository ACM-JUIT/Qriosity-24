const Question = require('../models/question');
const Email = require('../models/registered');
const User = require('../models/user');

const questionsController = async(req, res) => {
    try {
        const userId = req.user;

        console.log(userId);

        const userRegistered = await Email.exists({ registeredEmail: userId });

        if (!userRegistered) {
            return res.status(403).json({ error: "Unauthorized access. User not registered." });
        }

        const questions = await Question.find({}, 'questionNumber questionStatement hint');
        res.status(200).json({questions});
    } catch (error) {
        console.error('Error during fetching questions:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = questionsController;
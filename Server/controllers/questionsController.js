const Question = require('../models/question');
const Email = require('../models/registered');
const User = require('../models/user');

const questionsController = async(req, res) => {
    try {
        const questions = await Question.find({}, 'questionNumber questionStatement hint');
        res.status(200).json({questions});
    } catch (error) {
        console.error('Error during fetching questions:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = questionsController;
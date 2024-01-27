const Question = require('../models/question');
const User = require('../models/user')

const answerSubmitController = async(req, res) => {
    try {
        const { questionNumber, answer, username } = req.body;
        const ipAddress = req.ip;

        console.log(questionNumber, answer, username)

        if (!questionNumber || !answer || !username) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const question = await Question.findOne({ questionNumber });

        if (!question) {
            return res.status(400).json({ error: 'Invalid Question.' });
        }

        console.log(question);

        if (question.answer.toLowerCase === answer.toLowerCase) {
            console.log({
                ipAddress,
                questionNumber,
                username,
                answer,
                time: new Date(),
            });

            await User.updateOne(
                { name: username },
                { $inc: { points: 10 } }
            );

            return res.status(200).json({ message: 'Correct answer!', answer: question });
        } else {
            return res.status(400).json({ error: 'Incorrect answer.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = answerSubmitController;
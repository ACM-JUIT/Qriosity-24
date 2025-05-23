const Question = require('../models/question');
const User = require('../models/user')
const Attempts = require('../models/answers')

const answerSubmitController = async (req, res) => {
    try {
        const { questionNumber, answer, username } = req.body;
        const ipAddress = req.ip;

        const startTime = new Date('2024-02-17T08:30:00.000Z');        

        await Attempts.findOneAndUpdate(
            { name: username },
            { $push: { attempts: answer } },
            { new: true, upsert: true }
        );

        // console.log(questionNumber, answer, username, req.ip)

        if (!questionNumber || !answer || !username) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const question = await Question.findOne({ questionNumber });

        if (!question) {
            return res.status(400).json({ error: 'Invalid Question.' });
        }

        // console.log(question);

        if (question.answer.toLowerCase() === answer.toLowerCase()) {
            const currentTime = new Date();
            const timeDifferenceInMinutes = Math.floor((currentTime.getTime() - startTime.getTime()) / (1000 * 60));

            // console.log({
            //     ipAddress,
            //     questionNumber,
            //     username,
            //     answer,
            //     time: new Date(),
            // });

            await User.updateOne(
                { name: username },
                {
                    $inc: { points: 10, currentQuestion: 1 },
                    $push: { time: timeDifferenceInMinutes },
                },
            );

            const updatedUser = await User.findOne({ name: username });

            return res.status(200).json({ correct: true, message: 'Correct answer!', newQuestionNumber: updatedUser.currentQuestion });
        } else {
            return res.status(200).json({ correct: false, error: 'Incorrect answer.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error: Question response maybe wrong' });
    }
}

module.exports = answerSubmitController;
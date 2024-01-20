const Ques = require('../models/question');

function insertData() {
    Ques.insertMany ([
        {
            QuestionNumber: '1',
            QuestionStatement: "What is the capital of France?",
            Answer: "Paris",
            Hints: "It's known as the 'City of Love'",
        },
        {
            QuestionNumber: '2',
            QuestionStatement: "Who wrote 'Romeo and Juliet'?",
            Answer: "William Shakespeare",
            Hints: "He is often referred to as the 'Bard of Avon'",
        },
        {
            QuestionNumber: '3',
            QuestionStatement: "What is the largest planet in our solar system?",
            Answer: "Jupiter",
            Hints: "It's named after the king of the Roman gods",
        },
        {
            QuestionNumber: '4',
            QuestionStatement: "Which element has the chemical symbol 'H'?",
            Answer: "Hydrogen",
            Hints: "It is the lightest and most abundant element in the universe",
        },
        {
            QuestionNumber: '5',
            QuestionStatement: "In what year did the Titanic sink?",
            Answer: "1912",
            Hints: "It was a tragic event during the maiden voyage of the ship",
        },
        {
            QuestionNumber: '6',
            QuestionStatement: "What is the capital of Japan?",
            Answer: "Tokyo",
            Hints: "It is one of the most populous cities in the world",
        }
    ])
}

module.exports = insertData;
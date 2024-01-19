const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema ({
    QuestionNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    QuestionStatement: {
        type: String,
        required: true,
    },
    Answer: {
        type: String,
        required: true,
    },    
    Hints: {
        type: String,
    },
});

const Question = new mongoose.model('Question', questionSchema);

module.exports = Question;
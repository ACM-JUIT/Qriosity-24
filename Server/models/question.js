const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionNumber: {
        type: String,
        require: true,
        unique: true,
    },
    questionStatement: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },    
    hint: {
        type: String,
    },
});

const Questions = new mongoose.model('Question', questionSchema);

module.exports = Questions;
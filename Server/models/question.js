const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionNumber: {
        type: Number,
        requried: true,
        unique: true,
    },
    questionStatement: {
        type: String,
        requried: true,
    },
    answer: {
        type: String,
        requried: true,
    },    
    hint: {
        type: String,
    },
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;
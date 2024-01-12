const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionNumber: {
        type: String,
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
        requried: true,
    },
    hintVisible: {
        type: Boolean,
        default: false,
        requried: true,
    }, 
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;
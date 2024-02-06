const mongoose = require("mongoose");

const attempts = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    attempts : {
        type: [String],
    },
});

const Attempts = mongoose.model('Attempts', attempts);

module.exports = Attempts;
const mongoose = require("mongoose");

const regEmail = new mongoose.Schema({
    registeredEmail : {
        type: String,
        requried: true,
    },
});

const Email = mongoose.model('Email', regEmail);

module.exports = Email;
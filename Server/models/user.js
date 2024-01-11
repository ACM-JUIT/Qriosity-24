const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
    },
    password: {
        type: String,
        requried: true,
    },
    points: {
        type: Number
    },
    visitHistory: [{ timestamp: { type: Number } }],
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
const express = require("express");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");
const config = require('./config');
const app = express();
const cors = require("cors");
const User = require('./models/user');

const port = config.port;
const mongoURI = config.mongoURI;

app.use(cors());

const startServer = async () => {
    try {
        await connectToMongoDB(mongoURI);
        console.log('MongoDB Connected...');

        app.use(express.json());

        app.get('/',(req, res) => {
            res.status(200).json({msg: 'success'})
        });

        app.post("/signup", async (req, res) => {
            const { name, email } = req.body;
            const newUser = new User({ name, email, points: 0 });
            await newUser.save();
            res.status(200).json({ msg: "success" });
        });

        app.get("/leaderboard", async (req, res) => {
            try {
                const leaderboard = await User.find().sort({ points: -1 });
                res.status(200).json(leaderboard);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.listen(port, () => console.log(`Server started at ${port}...`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

startServer();

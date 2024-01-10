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

        app.post("/login", async (req, res) => {
            try {
                const { name, password } = req.body;
                const existingUser = await User.findOne({ name, password });
        
                if (existingUser) {
                    res.status(200).json({ msg: "Login success", user: existingUser });
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ error: "Internal Server Error" });
            }
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

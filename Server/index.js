const express = require("express");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");
const config = require('./config');
const app = express();
const cors = require("cors");
const User = require('./models/user');
const bcrypt = require('bcrypt');

const port = config.port;
const mongoURI = config.mongoURI;

const saltRounds = 10;

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
            const { name, email, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                res.status(400).json({ error: "Passwords do not match" });
                return;
            }

            let user = await User.findOne({email});
            if(user){
                res.status(400).json({ error: "User already exists" });
                return;
            }
            
            try {
                bcrypt.genSalt(saltRounds, function (saltError, salt) {
                    if (saltError) {
                        throw saltError
                        } else {
                        bcrypt.hash(password, salt, function(hashError, hash) {
                            if (hashError) {
                            throw hashError
                            } else {
                                const newUser = new User({ name, email, password: hash, points: 0 });
                                newUser.save();
                            }
                        })
                        }
                    })

                res.status(200).json({ msg: "success" });
            } catch (error) {
                console.error('Error during signup:', error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post("/login", async (req, res) => {
            try {
                const { email, password } = req.body;
                const existingUser = await User.findOne({ email });
        
                if (existingUser) {
                    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
                    if (isPasswordValid) {
                        res.status(200).json({ msg: "Login success", user: existingUser });
                    } else {
                        res.status(401).json({ error: "Incorrect password" });
                    }
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

const express = require("express");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");
const config = require('./config');
const app = express();
const cors = require("cors");
const User = require('./models/user');
const Question = require('./models/question');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const verify = require('./middleware/verifyToken')

require('dotenv').config();

const bcrypt = require('bcrypt');

const port = config.port;
const mongoURI = config.mongoURI;

const saltRounds = 10;

const loginRoute = require('./routes/login')
const leaderboardRoute = require('./routes/leaderboard')
const refreshRoute = require('./routes/refresh')
const answerRoute = require('./routes/questionVerify');
const profileRoute = require('./routes/profile')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const startServer = async () => {
    try {
        await connectToMongoDB(mongoURI);
        console.log('MongoDB Connected...');

        app.use(express.json());

        app.get('/',(req, res) => {
            res.status(200).json({msg: 'success'})
        });

        app.use(loginRoute);

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

        app.use(refreshRoute);

        app.use(answerRoute);

        app.use(profileRoute);

        app.get('/api/questions', async(req, res) => {
            try {
                const questions = await Question.find();
                res.status(200).json({questions});
            } catch (error) {
                console.error('Error during fetching questions:', error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        
        })

        // app.use(verify)
        app.use(leaderboardRoute);
        
        app.listen(port, () => console.log(`Server started at ${port}...`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

startServer();
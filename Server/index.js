const express = require('express');
const mongoose = require('mongoose');
const { connectToMongoDB } = require('./connect');
const config = require('./config');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verify = require('./middleware/verifyToken');

require('dotenv').config();

const port = config.port;
const mongoURI = config.mongoURI;

const loginRoute = require('./routes/login');
const leaderboardRoute = require('./routes/leaderboard');
const refreshRoute = require('./routes/refresh');
const answerRoute = require('./routes/questionVerify');
const profileRoute = require('./routes/profile');
const signupRoute = require('./routes/signup');
const questionsRoute = require('./routes/questions');
const chartRoute = require('./routes/chart');

app.use(cors());

app.use(cookieParser());

const startServer = async () => {
    try {
        await connectToMongoDB(mongoURI);
        console.log('MongoDB Connected...');

        app.use(express.json());

        // Default route for testing server status
        app.get('/', (req, res) => {
            res.status(200).json({ msg: 'success' });
        });

        // Routes
        app.use(loginRoute);
        app.use(signupRoute);
        app.use(refreshRoute);
        app.use(profileRoute);
        app.use(questionsRoute);
        app.use(leaderboardRoute);

        // Middleware for token verification
        app.use(verify);

        app.use(answerRoute);

        app.listen(port, () => console.log(`Server started at ${port}...`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

startServer();
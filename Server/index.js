const express = require("express")
const mongoose = require("mongoose");

const port = 3500;
const mongoURI = "YOUR_MONGO_DB_URI";
mongoose.connect(mongoURI, { useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    points: Number,
});

const User = mongoose.model("User", userSchema);
const app = express()

app.use(express.json());

app.get('/',(req, res) => {
    res.status(200).json({msg: 'success'})
})

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

app.listen(port, ()=> console.log('Server started at 3500...'))
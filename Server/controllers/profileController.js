const User = require('../models/user');

const profileController = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        console.log(user);
        res.status(200).json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = profileController;
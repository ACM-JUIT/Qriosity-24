const User = require('../models/user');

const chartController = async (req, res) => {
    try {
        const topUsers = await User.aggregate([
            { $sort: { points: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    points: 1,
                    time: 1,
                }
            }
        ]);

        console.log(topUsers);

        res.status(200).json(topUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server error: ${error}` });
    }
};

module.exports = chartController;
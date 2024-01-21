const jwt = require('jsonwebtoken');
const User = require('../models/user');

const refreshTokenController = async (req, res) => {
    try {
        const cookies = req.cookies;
        console.log('Received refresh token request:', cookies.refresh_token);
        if (!cookies?.refresh_token) return res.sendStatus(401);
        
        const refreshToken = cookies.refresh_token;
        console.log(refreshToken);

        const foundUser = await User.findOne({ refreshToken }).exec();
        console.log(foundUser);

        if (!foundUser.refreshToken.includes(refreshToken)) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {
                    console.log('Decoded:', decoded);
                    console.log('Error:', err);
                    if (err) return res.sendStatus(403); // Forbidden
                }
            );
            return res.sendStatus(403); // Forbidden
        }

        const currentDate = new Date();
        const newRefreshTokenArray = foundUser.refreshToken.filter((token) => {
            const decoded = jwt.decode(token);
            return decoded && decoded.exp * 1000 > currentDate.getTime();
        });

        // Evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log('Decoded:', decoded);
                console.log('Error:', err);
        
                if (err) {
                    foundUser.refreshToken = [...newRefreshTokenArray];
                    await foundUser.save();
                    return res.sendStatus(403);
                }

                const isTokenValid = foundUser.refreshToken.includes(refreshToken);
                // console.log(isTokenValid)
                if (!isTokenValid) {
                    return res.sendStatus(403);
                }

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": decoded.email,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );

                const newRefreshToken = jwt.sign(
                    { "email": foundUser.email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                await foundUser.save();

                res.cookie('refresh_token', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                
                console.log('New access token:', accessToken);
                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.error('Error during refresh token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = refreshTokenController;

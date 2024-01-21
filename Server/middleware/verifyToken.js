const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // console.log(err)
                if (err.name === 'TokenExpiredError') {
                    try {
                        const newAccessToken = await refreshAccessToken(req.cookies.refresh_token);
                        req.email = newAccessToken.email;
                        return next();
                    } catch (refreshError) {
                        console.error('Error refreshing access token:', refreshError);
                        return res.sendStatus(403);
                    }
                } else {
                    return res.sendStatus(403);
                }
            }
            req.email = decoded.email;
            next();
        }
    );
}

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await fetch('http://127.0.0.1:3500/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error(`Failed to refresh access token. Status: ${response.status}`);
        }

        const data = await response.json();
        return jwt.verify(data.accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.error('Error in refreshAccessToken:', error);
        throw error;
    }
}

module.exports = verifyToken
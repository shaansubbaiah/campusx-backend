const jwt = require('jsonwebtoken');
const apiConfig = require('../config/api.config');

module.exports = (req, res, next) => {
    try {
        // example Authentication header -> "Bearer <JWT token>"
        // extract only the token
        const token = req.headers.authorization.split(" ")[1];
        console.log(`\ntoken: ${token}\n`);

        // verify token is valid
        const decoded = jwt.verify(token, apiConfig.JWT_SECRET)
        req.userData = decoded;

        next();
    }
    catch (error) {
        res.status(401).send({
            message: `Auth Failed`
        })
    }
};
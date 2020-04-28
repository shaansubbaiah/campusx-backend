const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        const decoded = jwt.verify(token, "secretPass")
        req.userData = decoded;

        next();
    }
    catch (error) {
        res.status(401).send({
            message: `Auth Failed`
        })
    }
};
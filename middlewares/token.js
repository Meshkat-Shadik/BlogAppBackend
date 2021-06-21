const jwt = require("jsonwebtoken");
const config = require("../config");

const checkToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.key, (err, decodedData) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Token is invalid",
                });
            } else {
                req.decoded = decodedData;
                next();
            }
        });
    } else {
        next("Token is not provided");
    }
};

module.exports = { checkToken };
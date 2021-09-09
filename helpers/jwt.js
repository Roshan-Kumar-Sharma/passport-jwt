const jwt = require("jsonwebtoken");
const { env } = require("../configs/secret");

const signAccessToken = (eat) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secretKey = env.JWT_ACCESS_TOKEN_SECRET;

        const options = {
            issuer: "codewithroshan.com",
            expiresIn: eat,
        };

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });
};

module.exports = {
    signAccessToken,
};

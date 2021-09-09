require("dotenv").config();

const { JWT_ACCESS_TOKEN_SECRET } = process.env;

module.exports = {
    env: {
        JWT_ACCESS_TOKEN_SECRET,
    },
};

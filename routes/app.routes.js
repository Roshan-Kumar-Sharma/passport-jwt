const express = require("express");
const createHttpError = require("http-errors");
const passport = require("passport");
const { signAccessToken } = require("../helpers/jwt");
require("../helpers/passportjwt.config");

const router = express.Router();

router.get(
    "/simple",
    passport.authenticate("jwtVerify", {
        session: false,
    }),
    (req, res, next) => {
        const message =
            "Your token was verified successfully using passport-jwt using simple method.";

        const response = {
            message,
            payload: req.user,
        };

        res.send(response);
    }
);

router.get(
    "/custom/callback",
    async (req, res, next) => {
        passport.authenticate("jwtVerify", async (err, payload, info) => {
            if (err || !payload) {
                if (info.name === "JsonWebTokenError") {
                    console.log(info.name + "\n" + info.message);
                    return next(createHttpError.Unauthorized());
                }
                return next(info);
            }
            req.login(payload, { session: false }, async (err) => {
                if (err) return next(err);
                return next();
            });
        })(req, res, next);
    },
    (req, res, next) => {
        const message =
            "Your token was verified successfully using passport-jwt using custom callback.";

        const response = {
            message,
            payload: req.user,
        };
        res.send(response);
    }
);

router.get("/token", async (req, res, next) => {
    try {
        const token = await signAccessToken("30s");
        console.log(token);
        res.send(token);
    } catch (error) {
        next(createHttpError.ServiceUnavailable(error));
    }
});

module.exports = router;

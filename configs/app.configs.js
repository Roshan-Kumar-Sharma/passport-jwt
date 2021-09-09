const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("dev"));
    // app.use(passport.initialize());
};

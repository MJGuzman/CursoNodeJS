const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const User = require("../models/entities/user");

const app = express();

app.post("/login", (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, "email password role", (err, resp) => {
        if (err)
            return res.status(500).json({
                err: 500,
                message: err.message,
            });

        if (!resp)
            return res.status(404).json({
                err: 404,
                message: "Usuario no existe",
            });

        if (!bcrypt.compareSync(body.password, resp.password))
            return res.status(404).json({
                err: 404,
                message: "Password incorrecto",
            });

        let token = jwt.sign({ email: resp.email, role: resp.role },
            process.env.SEED, {
                expiresIn: process.env.EXPIRATION_TOKEN,
            }
        );

        res.json({
            user: resp,
            token,
        });
    });
});

module.exports = app;
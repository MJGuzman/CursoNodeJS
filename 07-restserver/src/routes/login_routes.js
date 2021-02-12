const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const User = require("../models/entities/user");
const { json } = require("express");

const app = express();

app.post("/login", (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, resp) => {
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

        let token = jwt.sign(
            _.pick(resp, ["_id", "name", "email", "role", "status", "google"]),
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

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
    };

    return user;
}

app.post("/google", async(req, res) => {
    let token = req.body.idtoken;

    let userGoogle = await verify(token).catch((err) => {
        return res.status(401).json({
            err: 401,
            message: err.message,
        });
    });

    User.findOne({ email: userGoogle.email }, (err, user_res) => {
        if (err)
            return res.status(404).json({
                err: 500,
                message: err.message,
            });

        if (!user_res) {
            console.log("no es por aqui");
            let user = new User({
                name: userGoogle.name,
                email: userGoogle.email,
                password: bcrypt.hashSync("GOOGLE_SIGN", 10),
                img: userGoogle.img,
                google: true,
            });

            user.save(user, (err, userSaved) => {
                if (err)
                    return res.status(500).json({
                        err: 500,
                        message: err,
                    });

                let token = jwt.sign({ email: user_res.email, role: user_res.role },
                    process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN }
                );
                return res.json({
                    user: userSaved,
                    token,
                });
            });
        } else {
            if (!user_res.google)
                return res.status(400).json({
                    err: 400,
                    message: "Ya has iniciado sesion con otro tipo de autenticacion",
                });

            let token = jwt.sign({ email: user_res.email, role: user_res.role },
                process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN }
            );

            return res.json({
                user: user_res,
                token,
            });
        }
    });
});

module.exports = app;
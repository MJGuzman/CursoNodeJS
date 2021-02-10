const express = require("express");

const bcrypt = require("bcrypt");
const _ = require("underscore");
const User = require("../models/entities/user");
const { verifyToken, verifyRole } = require("../middlewares/authentication");

const app = express();

// get users list
app.get("/user", verifyToken, (req, res) => {
    User.find({ status: true }, "name email role status ").exec((err, userDb) => {
        if (err)
            return res.status(400).json({
                err: 400,
                message: err.message,
            });

        User.countDocuments({ status: true }, (err, counted) => {
            if (err)
                return res.status(400).json({
                    err: 400,
                    message: err.message,
                });

            res.json({
                users: userDb,
                count: counted,
            });
        });
    });
});

// get user one
app.get("/user/:id", verifyToken, (req, res) => {
    let id = req.params.id;
    user.findById(id, (err, userDb) => {
        if (err)
            return res.status(400).json({
                err: 400,
                message: err.message,
            });

        res.json({
            user: userDb,
        });
    });
});

// add user
app.post("/user", [verifyToken, verifyRole], (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    user.save((err, userDb) => {
        if (err) {
            return res.status(400).json({
                err: 400,
                message: err.message,
            });
        }

        res.json({
            user: userDb,
        });
    });
});

// update user
app.put("/user/:id", [verifyToken, verifyRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["name", "email", "img", "role", "status"]);

    User.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, userDb) => {
            if (err)
                return res.status(400).json({
                    err: 400,
                    message: err.message,
                });

            res.json({
                user: userDb,
            });
        }
    );

    // res.json({ id });
});

// delete user
app.delete("/user/:id", [verifyToken, verifyRole], (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(
        id, { status: false }, { new: true, runValidators: true },
        (err, userDb) => {
            if (err)
                return res.status(400).json({
                    err: 400,
                    message: err.message,
                });
            if (!userDb)
                return res.status(404).json({
                    err: 404,
                    message: "id no encontrado",
                });

            res.json({
                user: userDb,
            });
        }
    );
});

module.exports = app;
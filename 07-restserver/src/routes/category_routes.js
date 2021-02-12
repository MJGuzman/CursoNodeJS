const express = require("express");
const Category = require("../models/entities/category");
const User = require("../models/entities/user");
const _ = require("underscore");
const { verifyToken, verifyRole } = require("../middlewares/authentication");

const app = express();

app.get("/category", verifyToken, (req, res) => {
    Category.find()
        .sort("description")
        .populate({ path: "user", select: "name", model: User })
        .exec((err, categotry_resp) => {
            if (err)
                return res.status(500).json({
                    err: 500,
                    message: err.message,
                });

            res.json({
                category: categotry_resp,
            });
        });
});

app.get("/category/:id", verifyToken, (req, res) => {
    let id = req.params.id;

    Category.findById(id, (err, categotry_resp) => {
        if (err)
            return res.status(500).json({
                err: 500,
                message: err,
            });

        res.json({
            category: categotry_resp,
        });
    });
});

app.post("/category", [verifyToken], (req, res) => {
    try {
        let idUser = req.user._id;
        let body = req.body;

        let newCategory = new Category({
            description: body.description,
            user: idUser,
        });

        newCategory.save((err, category_saved) => {
            if (err)
                return res.status(500).json({
                    err: 500,
                    message: err.message,
                });

            return res.json({
                category: category_saved,
            });
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
});

app.put("/category/:id", verifyToken, (req, res) => {
    try {
        let idCategory = req.params.id;
        let body = _.pick(req.body, ["description"]);

        Category.findByIdAndUpdate(
            idCategory,
            body, { new: true, runValidators: true, context: "query" },
            (err, categotry_resp) => {
                if (err)
                    return res.status(500).json({
                        err: 500,
                        message: err.message,
                    });

                res.json({
                    category: categotry_resp,
                });
            }
        );
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
});

app.delete("/category/:id", [verifyToken, verifyRole], (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id, { new: true }, (err, category_deleted) => {
        if (err)
            return res.status(500).json({
                err: 500,
                message: err.message,
            });

        res.json({
            category_deleted,
        });
    });
});
module.exports = app;
const express = require("express");
const { verifyToken } = require("../middlewares/authentication");
const Product = require("../models/entities/product");
const User = require("../models/entities/user");
const Category = require("../models/entities/category");
const { json } = require("express");

const app = express();

app.get("/product", (req, res) => {
    let page = !req.query.page ? 10 : req.params.page;
    let limit = !req.query.limit ? 5 : req.params.limit;

    Product.find()
        .limit(limit)
        .populate({ path: "category", select: ["description"], model: Category })
        .populate({ path: "user", select: ["name"], model: User })
        .exec((err, product_resp) => {
            if (err)
                return res.status(500).json({
                    err: 500,
                    message: err.message,
                });

            res.json({
                product: product_resp,
                page,
                limit,
            });
        });
});

app.get("/product/buscar/:search", (req, res) => {
    let searchBy = new RegExp(req.params.search, "i");

    Product.find({ name: searchBy })
        .populate({ path: "category", select: ["description"], model: Category })
        .populate({ path: "user", select: ["name"], model: User })
        .exec((err, product_resp) => {
            if (err)
                return res.status(500).json({
                    err: 500,
                    message: err.message,
                });

            res.json({
                product: product_resp,
            });
        });
});

app.get("/product/:id", (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err)
            return res.status(500).json({
                err: 500,
                message: err.message,
            });

        res.json({
            product,
        });
    });
});

app.post("/product", verifyToken, (req, res) => {
    let idUser = req.user._id;
    let body = req.body;

    // verify if category exist
    Category.findOne({ description: body.category }, (err, category_resp) => {
        if (err)
            return res.status(500).json({
                err: 500,
                message: err.message,
            });

        if (!category_resp)
            return res.status(400).json({
                err: 400,
                message: "Esta categoria no existe",
            });

        // create product

        let newProduct = new Product({
            name: body.name,
            unit_price: body.price,
            description: body.description,
            available: body.available,
            category: category_resp._id,
            user: idUser,
        });

        newProduct.save((err, produc_saved) => {
            if (err)
                return res.status(500).json({
                    err: 500,
                    message: err.message,
                });

            res.json({
                product: produc_saved,
            });
        });
    });
});

app.put("/product/:id", verifyToken, (req, res) => {
    let idProduct = req.params.id;
    let idUser = req.user._id;
    let body = req.body;

    Product.findByIdAndUpdate(
        idProduct,
        body, { new: true, runValidators: true },
        (err, product_updated) => {
            if (err)
                return res.status(500).json({
                    err: 500,
                    message: err.message,
                });

            res.json({
                product: product_updated,
            });
        }
    );
});

app.delete("/product/:id", verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    if (!req.body.available)
        return res.status(400).json({
            err: 400,
            message: "No se ha mandado ningun parametro",
        });

    Product.findByIdAndUpdate(id, body, { new: true }, (err, product_updated) => {
        if (err)
            return res.status(500).json({
                err: 500,
                message: err.message,
            });

        if (product_updated.available)
            return res.json({
                product: product_updated,
                message: "Producto activado",
            });

        res.json({
            product: product_updated,
            message: "Producto desactivado",
        });
    });
});

module.exports = app;
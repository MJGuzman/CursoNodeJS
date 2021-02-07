const { Router } = require("express");
const bodyParser = require("body-parser");

const router = Router();

router.get("/", (req, res) => {
    res.json({ name: "Misael" });
});

router.get("/usuario", (req, res) => {
    res.json({ name: "Jesus" });
});

router.post("/usuario/add/", (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            message: "nombre vacio",
        });
    } else {
        res.json({ usuario: body });
    }
});

module.exports = {
    router,
};
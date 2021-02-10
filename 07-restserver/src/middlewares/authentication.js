const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err)
            return res.status(401).json({
                err: 401,
                message: err.message,
            });

        req.user = decode;

        next();
    });
};

let verifyRole = (req, res, next) => {
    let role = req.user.role;

    if (role != "ADMIN_ROLE")
        return res.json({
            message: "No tienes permiso para esta accion",
        });

    next();
};

module.exports = { verifyToken, verifyRole };
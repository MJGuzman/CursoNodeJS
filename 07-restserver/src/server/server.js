// importations
require("../config/appsettings");
const express = require("express");
const { router } = require("../routes/route");
const bodyParser = require("body-parser");

// initializations
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// settings

// routes
app.use("/", router);

// starting server
app.listen(process.env.PORT, () => {
    console.log(`Corriendo en el puerto ${process.env.PORT}`);
});
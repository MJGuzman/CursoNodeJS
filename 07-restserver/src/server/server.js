// importations
require("../config/appsettings");
const express = require("express");
const path = require("path");
const mongoose = require("../database/connection");
const bodyParser = require("body-parser");

// initializations
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
// settings

// routes
app.use(require("../routes/route"));

// connecting Db
mongoose.connectDB();

// starting server
app.listen(process.env.PORT, () => {
    console.log(`Corriendo en el puerto ${process.env.PORT}`);
});
const mongoose = require("mongoose");

let connectDB = async() => {
    await mongoose.connect(
        process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
        (err, res) => {
            if (err) throw new Error(`No se pudo establecer la conexion ${err}`);

            console.log("Base de datos online");
        }
    );
};

module.exports = {
    connectDB,
};
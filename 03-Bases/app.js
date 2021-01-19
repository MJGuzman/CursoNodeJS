// Tabla de multiplicar
const { crearTabla } = require("./multiplicar/multiplicacion");

let base = "hgfh";

crearTabla(base)
    .then((resp) => {
        console.log(`Archivo ${resp} creado`);
    })
    .catch((err) => {
        console.log(err.message);
    });
const opts = {
    base: {
        demandOption: true,
        alias: "b",
    },
    limite: {
        default: 10,
        alias: "l",
    },
};

const argv = require("yargs")
    .command("listar", "Muestra tabla de multiplicacion", opts)
    .command("crear", "Crea tabla de multiplicacion", opts).argv;

module.exports = {
    argv,
};
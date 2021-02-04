const yargs = require("yargs");

const opts = {
    descripcion: {
        alias: "d",
        demandOption: true,
    },
    completado: {
        alias: "c",
        default: true,
    },
};

const argv = require("yargs")
    .command("crear", "Crea tarea para hacer", opts)
    .command("actualizar", "Cambia el status a las tareas", opts)
    .command("borrar", "Borra una tarea creada", opts)
    .help().argv;

module.exports = {
    argv,
};
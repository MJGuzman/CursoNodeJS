// Requires
const { crearTabla, listarTabla } = require("./multiplicar/multiplicacion");
const argv = require("./config/yargs").argv;
const colors = require("colors");

let comando = argv._[0];

switch (comando) {
    case "crear":
        crearTabla(argv.base, argv.limite)
            .then((resp) => {
                console.log(`Archivo ${colors.red(resp)} creado`);
            })
            .catch((err) => {
                console.log(err.message);
            });
        break;
    case "listar":
        listarTabla(argv.base, argv.limite)
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
        break;
    default:
        console.log("Comando no reconocido");
}
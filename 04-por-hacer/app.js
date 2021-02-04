const argv = require("./config/yargs").argv;
const tarea = require("./por-hacer/por-hacer");
const colors = require("colors");

let comando = argv._[0];

switch (comando) {
    case "crear":
        // tarea.guardarTarea(argv.descripcion);
        console.log(tarea.guardarTarea(argv.descripcion));
        break;
    case "listar":
        let listado = tarea.mostrarTareas();

        for (const TAREA of listado) {
            console.log("====Por Hacer====".green);
            console.log(TAREA.descripcion);
            console.log("Estado:", TAREA.completado);
            console.log("=================".green);
        }
        break;
    case "actualizar":
        tarea.actualizarTarea(argv.descripcion, argv.completado);
        break;

    case "borrar":
        let borrado = tarea.borrarTarea(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log("object");
        break;
}
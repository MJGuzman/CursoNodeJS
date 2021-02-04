const fs = require("fs");

let listadoPorHacer = [];

const cargarDb = () => {
    try {
        listadoPorHacer = require("../db/database.json");
    } catch (error) {
        listadoPorHacer = [];
    }
};

const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);

    console.log(data);

    fs.writeFileSync("db/database.json", data, (err) => {
        if (err) throw new Error("No se pudo guardar la tarea", err);
    });
};

const guardarTarea = (descripcion) => {
    cargarDb();

    let tarea = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(tarea);

    guardarDb();
    return tarea;
};

const mostrarTareas = () => {
    cargarDb();

    return listadoPorHacer;
};

const actualizarTarea = (descripcion, completado = true) => {
    cargarDb();

    let index = listadoPorHacer.findIndex(
        (tarea) => tarea.descripcion === descripcion
    );

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        console.log("Esta tarea no existe");
        return false;
    }
};

const borrarTarea = (descripcion) => {
    cargarDb();

    let index = listadoPorHacer.findIndex(
        (tarea) => tarea.descripcion === descripcion
    );

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDb();
        return true;
    }
    listadoPorHacer;
    console.log(tarea);

    return false;
};

module.exports = {
    guardarTarea,
    mostrarTareas,
    actualizarTarea,
    borrarTarea,
};
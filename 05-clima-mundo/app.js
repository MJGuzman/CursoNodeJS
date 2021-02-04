const argv = require("./config/yargs").argv;
const axios = require("axios");
const service = require("./service/clima");

let getInfoClima = async(location) => {
    let coordenadas = await service.getDireccion(location);
    let temp = await service.getClima(coordenadas.lat, coordenadas.lng);

    return {
        direccion: coordenadas.direccion,
        temp,
    };
};

getInfoClima(argv.direccion)
    .then((resp) => {
        console.log(`La temperatura de ${resp.direccion} es de ${resp.temp} F`);
    })
    .catch((err) => {
        console.log(err);
    });
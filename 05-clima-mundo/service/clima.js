const axios = require("axios");

const getDireccion = async(pais) => {
    let encodeUrl = encodeURI(pais);
    let response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyAvKCjvAmF6EmuBsS7Q4K7P-ZG-4M0J1WY`
    );

    if (response.data.status === "ZERO_RESULTS")
        throw new Error("No se encontro la ciudad!");

    let location = response.data.results[0];
    let direccion = location.formatted_address;
    let lat = location.geometry.location.lat;
    let lng = location.geometry.location.lng;

    return {
        direccion,
        lat,
        lng,
    };
};

const getClima = async(lat, lng) => {
    let response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=5a0e60e9d4d971d93a7144dfb6848528`
    );

    // if (response.data.cod == 400) throw new Error("Error", response.data.message);

    return response.data.main.temp;
};

module.exports = {
    getDireccion,
    getClima,
};
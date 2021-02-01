const fs = require("fs");

let crearTabla = async(base, limite = 10) => {
    if (!Number(base))
        throw new Error(`El valor introducido ${base} no es un numero`);

    let data = "";

    for (index = 1; index <= limite; index++) {
        data += `${base} * ${index} = ${base * index} \n`;
    }

    fs.writeFile(`tablas/tabla${base}.txt`, data, (err) => {
        if (err) throw new Error(err);
    });

    return `tabla${base}.txt`;
};

let listarTabla = async(base, limite) => {
    if (!Number(base) || !Number(limite))
        throw new Error(
            `El valor introducido no en un numero! ${base} - ${limite}`
        );

    for (let index = 1; index <= limite; index++) {
        console.log(`${base} * ${index} = ${base * index}`);
    }
    return `Tabla del ${base} al ${limite} generada correctamente`;
};

module.exports = {
    crearTabla,
    listarTabla,
};
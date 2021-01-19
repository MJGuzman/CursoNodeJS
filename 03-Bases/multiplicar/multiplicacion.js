const fs = require("fs");

let crearTabla = async(base) => {
    if (!Number(base))
        throw new Error(`El valor introducido ${base} no es un numero`);

    let data = "";

    for (index = 1; index <= 10; index++) {
        data += `${base} * ${index} = ${base * index} \n`;
    }

    fs.writeFile(`tablas/tabla${base}.txt`, data, (err) => {
        if (err) throw new Error(err);
    });

    return `tabla${base}.txt`;
};

module.exports = {
    crearTabla,
};
let empleados = [{
        id: 1,
        nombre: "Jose",
    },
    {
        id: 2,
        nombre: "Marcos",
    },
    {
        id: 3,
        nombre: "Misael",
    },
];

let salarios = [{
        id: 1,
        salario: "1000",
    },
    {
        id: 2,
        salario: "2000",
    },
];

let getEmpladoById = (id) => {
    return new Promise((resolve, reject) => {
        let empleadosDB = empleados.find((emplado) => emplado.id === id);

        if (!empleadosDB) reject(`No existe el empleado con el ID ${id}`);
        else resolve(empleadosDB);
    });
};

let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find((salario) => salario.id === empleado.id);

        if (!salarioDB) reject(`${empleado.nombre} no tiene salario asignado`);
        else resolve({ nombre: empleado.nombre, salario: salarioDB.salario });
    });
};

getEmpladoById(2).then(
    (empleado) => {
        // console.log(empleado)
        getSalario(empleado).then(
            (salario) => console.log(salario),
            (err) => console.log(err)
        );
    },
    (err) => console.log(err)
);

// Promesas en cadena

getEmpladoById(3)
    .then((empleado) => {
        return getSalario(empleado);
    })
    .then((resp) => {
        console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
    })
    .catch((err) => {
        console.log(err);
    });
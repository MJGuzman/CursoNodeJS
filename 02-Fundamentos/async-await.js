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

let getEmpladoById = async(id) => {
    let empleadosDB = empleados.find((emplado) => emplado.id === id);

    if (!empleadosDB) throw new Error(`No existe el empleado con el ID ${id}`);
    else return empleadosDB;
};

let getSalario = async(empleado) => {
    let salarioDB = salarios.find((salario) => salario.id === empleado.id);

    if (!salarioDB)
        throw new Error(`${empleado.nombre} no tiene salario asignado`);
    else return { nombre: empleado.nombre, salario: salarioDB.salario };
};

let getInformation = async(id) => {
    let empleado = await getEmpladoById(id);
    let salario = await getSalario(empleado);

    return `El salario de ${empleado.nombre} es de ${salario.salario}`;
};

getInformation(1)
    .then((resp) => {
        console.log(resp);
    })
    .catch((err) => {
        console.log(err);
    });
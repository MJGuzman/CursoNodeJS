let empleados = [{
        id: 1,
        nombre: 'Jose'
    },
    {
        id: 2,
        nombre: 'Marcos'
    },
    {
        id: 3,
        nombre: 'Misael'
    },
];

let salarios = [{
        id: 1,
        salario: '1000'
    },
    {
        id: 2,
        salario: '2000'
    }

];

let getEmpleadoById = (id, callback) => {

    let empleado = empleados.find(empleado => empleado.id == id);

    if (!empleado)
        callback(`El ID ${id} no se encuentra en empleados`)
    else
        callback(null, empleado)

}

let getSalario = (empleado, callback) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id)

    if (!salarioDB)
        callback(`Este Empleado ${empleado.nombre} no tiene un salario`)
    else {
        salario = { nombre: empleado.nombre, salario: salarioDB.salario }
        callback(null, salario)
    }
}

getEmpleadoById(4, (err, empleado) => {

    if (err)
        return console.log(err);

    getSalario(empleado, (err, salario) => {

        if (err)
            return console.log(err);

        console.log(salario);
    })
});

// getSalario(2, (err, salario) => {
//     if (err)
//         return console.log(err);

//     console.log(salario);
// })
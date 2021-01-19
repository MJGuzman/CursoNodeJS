// setTimeout(() => {
//     console.log('Hola Mundo')
// }, 3000)

let getUserById = (id, callbak) => {

    let user = {
        nombre: 'Misael',
        id
    }

    if (id === 10)
        callbak(`ID ${id} no existe en la BDD`)
    else
        callbak(null, user)
}

getUserById(11, (err, user) => {

    if (err)
        return console.log(err);

    console.log('El usuario es', user);
})
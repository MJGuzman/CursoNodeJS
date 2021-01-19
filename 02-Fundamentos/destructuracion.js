let Deadpool = {
    nombre: 'Wader',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre: function() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`
    }
}

console.log(Deadpool.getNombre());

let { nombre, apellido, poder } = Deadpool;

console.log(apellido)
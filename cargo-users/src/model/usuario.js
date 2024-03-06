class Usuario {
    constructor( id, nombre, email, empresa, cargo) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.empresa = empresa;
        this.cargo = cargo;
    }
}

module.exports = Usuario;
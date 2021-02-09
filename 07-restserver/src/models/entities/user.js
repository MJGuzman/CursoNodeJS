const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const roleEnum = require("../enums/role_enum");

let Shema = mongoose.Schema;

let userShema = new Shema({
    name: {
        type: String,
        required: [true, "El nombre es obligatoria"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es obligatoria"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: roleEnum.rolesValidos,
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userShema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("user", userShema);
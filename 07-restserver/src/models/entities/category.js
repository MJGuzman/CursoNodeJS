const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Shema = mongoose.Schema;

let categoryShema = new Shema({
    description: {
        type: String,
        unique: true,
        required: [true, "La descipcion debe ser unica"],
    },
    user: {
        type: Shema.Types.ObjectId,
        ref: "users",
    },
});

categoryShema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("category", categoryShema);
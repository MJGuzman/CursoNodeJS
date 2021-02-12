const mongoose = require("mongoose");
const Shema = mongoose.Schema;

let productShema = new Shema({
    name: {
        type: String,
        requiered: [true, "El nombre es necesario"],
    },
    unit_price: {
        type: Number,
        requiered: [true, "El precio unitario es necesario"],
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    category: {
        type: Shema.Types.ObjectId,
        ref: "Category",
        required: [true, "La categoria es necesaria"],
    },
    user: {
        type: Shema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"],
    },
});

module.exports = mongoose.model("product", productShema);
const { Schema } = require("mongoose");

const ProductSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = ProductSchema;
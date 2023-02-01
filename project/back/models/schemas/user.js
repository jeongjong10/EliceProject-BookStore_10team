const { Schema } = require("mongoose");

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    admin: {
        type: Boolean, // String?
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = UserSchema;
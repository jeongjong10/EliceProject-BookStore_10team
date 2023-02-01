const { Schema } = require("mongoose");

const UserSchema = new Schema({
    address: {
        postalCode: {
            type: String,
            required: false,
        },
        address1: {
            type: String,
            required: false,
        },
        address2: {
            type: String,
            required: false,
        },
        recieverName: {
            type: String,
            required: false,
        },
        recieverPhoneNumber: {
            type: String,
            required: false,
        },
    },
    userId: {
        type: String,
        required: true,
    },
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
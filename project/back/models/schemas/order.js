const { Schema } = require("mongoose");

const OrderSchema = new Schema({
        orderNumber: {
            type: String,
            required: true
        },
        username: {
            type: 'String',
            required: true
        },
        phone: {
            type: String,
            address: String,
            comment: String,
            status: String,
            productName: String,
            count:
        }

    }

    , {
        timestamps: true,
    });

module.exports = OrderSchema;
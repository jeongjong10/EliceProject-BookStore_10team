const { Schema } = require("mongoose");
const nanoId = require("./types/nano-id");

// address 객체 분리
const address = {
    postalCode: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: true,
    },
    recieverName: {
        type: String,
        required: true,
    },
    recieverPhoneNumber: {
        type: String,
        required: true,
    },
};

const OrderSchema = new Schema({
        address,
        orderNumber: nanoId,
        userId: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "상품 준비 중",
        },
        // 주문 내역은 배열
        orderList: [{
            productName: {
                type: String,
                required: true,
            },
            count: {
                type: Number,
                required: true,
            },
        }, ],
        totalProductPrice: {
            type: Number,
            required: true,
        },
        shipping: {
            type: Number,
            required: true,
            default: 3000
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        activate: {
            type: Boolean,
            required: true,
            default: true,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = OrderSchema;
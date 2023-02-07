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
    receiverName: {
        type: String,
        required: true,
    },
    receiverPhoneNumber: {
        type: String,
        required: true,
    },
};

const OrderSchema = new Schema({
    order : new Schema ({
        address,
        comment: {
            type: String,
            required: true,
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
        }],
        totalPrice: {
            type: Number,
            required: true,
        },
        totalProductPrice: {
            type: Number,
            required: true,
        },
    }),
    orderNumber: nanoId,
    userId: {
        type: String,
        required: true,
    },
    shipping: {
        type: Number,
        required: true,
        default: 3000
    },
    status: {
        type: String,
        required: true,
        default: "상품 준비 중",
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
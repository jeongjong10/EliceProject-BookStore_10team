const { Schema } = require("mongoose");

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
}

const OrderSchema = new Schema({
        address,
        orderNumber: {
            type: String,
            required: true,
        },
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
            // default: "상품 준비중" 넣는 거 어떠신가요 ?? [종열] 좋아요
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
        totalProductPrice: {
            type: Number,
            required: true,
        },
        shipping: {
            type: Number,
            required: true,
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
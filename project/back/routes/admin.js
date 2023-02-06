const express = require("express");
const router = express.Router();
const { Product, Order } = require("../models/index");
const verifyUser = require("../middleware/verifyUser_middlewaring");

// ------ ADMIN: 상품 등록 ------
router.post("/products", verifyUser(true), async(req, res, next) => {
    try {
        const products = req.body;

        const product = await Product.create(products);

        console.log("상품 등록", product);
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 수정 ------
router.patch("/products/:_id", verifyUser(true), async(req, res, next) => {
    try {
        const { _id } = req.params;
        const update = req.body;

        await Product.findOneAndUpdate({ _id }, update);

        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 삭제 (비활성화) ------
router.delete("/products/:_id", verifyUser(true), async(req, res, next) => {
    try {
        const { _id } = req.params;

        await Product.findOneAndUpdate({ _id }, { activate: false });
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 전체 유저 주문 내역 조회 ------
router.get("/orders", verifyUser(true), async(req, res, next) => {
    try {
        await Product.find({}); // 모든 주문 내역 불러오기
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 주문 내역 수정 (배송상태) ------
router.patch("/orders/:_id", verifyUser(true), async(req, res, next) => {
    try {
        const { _id } = req.params;
        const { status } = req.body(); // 수정 할 수 있는 것이 배송상태밖에 없겠지요..?

        if (!status) {
            throw new Error("req.body에 status가 존재하지 않습니다.");
        }

        await Order.findOneAndUpdate({ _id }, { status });
        const order = Order.findById({ _id });

        if (order.status !== status) {
            console.log("사용자 주문 배송상태 수정 성공 : ", order.status);
        } else {
            console.log("사용자 주문 배송상태 수정 실패 : ", order.status);
        }

        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 주문내역 삭제 (비활성화) ------
router.delete("/orders/_id", verifyUser(true), async(req, res, next) => {
    try {
        const { _id } = req.params;

        if (!_id) {
            throw new Error("req.params에 _id 값이 없습니다.");
        }

        await Order.findOneAndUpdate({ _id }, { activate: false });
        const order = await Order.findOne({ _id });

        if (order.activate == false) {
            console.log("사용자 주문 비활성화 완료 : ", order.activate);
        } else {
            console.log("사용자 주문 비활성화 실패 : ", order.activate);
        }

        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
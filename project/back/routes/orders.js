const express = require("express");
const router = express.Router();
const { Order } = require("../models/index");

// 현재 유저 불러오는 로직 추가
// verifyUser => _id(유저), admin 여부

// ------ USER: 현재 유저의 주문내역 조회 ------
router.get("/", async(req, res, next) => {
    try {
        // (예정) 현재 유저 불러오기

        const orders = await Product.find({}); // (예정) 현재 유저의 주문내역 찾기
        res.json(orders);
        res.status(201).send({ message: "주문내역 조회" });
    } catch (e) {
        next(e);
    }
});

// ------ USER: 현재 유저의 주문내역 저장 ------
router.post("/", async(req, res, next) => {
    try {
        // (예정) 현재 유저 불러오기
        // const {_id} = verifyUser()

        // req.body: address(postalCode, address1, address2, recieverName, recieverPhone), orderNumber, comment, status, orderList(productName, count), totalProductPrice, shipping, totalPrice
        const orders = req.body;

        // userId는 직접 추가
        // User의 userId와 혼동이 올 수 있음 (쥬문의 userId에는 User의 _id 값이 들어가기 때문 )

        await Order.create({...orders, userId: _id });
        res.status(201).send({ message: "주문내역 저장 성공" });
    } catch (e) {
        next(e);
    }
});

// ------ USER: 현재 유저의 주문내역 수정 ------
router.post("/", async(req, res, next) => {
    try {
        // (예정) 현재 유저 불러오기
        // const {_id} = verifyUser()

        const { _id } = req.params;

        const updateOrder = req.body;

        await Order.findOneAndUpdate({ _id }, { updateOrder });
        res.status(201).send({ message: "주문내역 수정 성공" });
    } catch (e) {
        next(e);
    }
});

// ------ USER: 현재 유저의 주문내역 삭제 (비활성화) ------
router.patch("/", async(req, res, next) => {
    try {
        // (예정) 현재 유저 불러오기
        // const {_id} = verifyUser()

        const { _id } = req.params;

        await Order.findOneAndUpdate({ _id }, { activate: false });
        res.status(201).send({ message: "주문내역 비활성화 성공" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
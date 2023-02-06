const express = require("express");
const verifyUser = require("../middleware/verifyUser_middlewaring");
const router = express.Router();
const { Product, Order } = require("../models/index");
const verifyUser = require("../middleware/verifyUser_middlewaring");

// ------ ADMIN: 상품 등록 ------
router.post("/products", verifyUser(true), async(req, res, next) => {
    console.log(
        "------------------- 관리자 상품 등록 시도 -----------------------"
    );
    try {
        const products = req.body;
        if (!products) {
            console.error("Body 없음.");
            console.log(
                "---------------- 요청 데이터 Body 확인 실패 ---------------------"
            );
            throw new Error("Body 내용이 없습니다.");
        }

        const product = await Product.create(products);
        if (!product) {
            console.error("상품 데이터 생성 실패");
            console.log(
                "---------------- 관리자 상품 데이터 생성 실패 ---------------------"
            );
            throw new Error("상품 데이터 생성에 실패하였습니다.");
        } else {
            console.log("상품 등록", product);
            console.log(
                "---------------- 관리자 상품 데이터 생성 성공 ---------------------"
            );
        }

        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 수정 ------
router.patch("/products/:_id", verifyUser(true), async(req, res, next) => {
    console.log(
        "-------------------- 관리자 상품 수정 시도 ------------------------"
    );
    try {
        const { _id } = req.params;
        if (!_id) {
            console.error("params 없음.");
            console.log(
                "---------------- 요청 데이터 Params 확인 실패 ---------------------"
            );
            throw new Error("params 내용이 없습니다.");
        }

        const update = req.body;
        if (!update) {
            console.error("Body 없음.");
            console.log(
                "---------------- 요청 데이터 Body 확인 실패 ---------------------"
            );
            throw new Error("Body 내용이 없습니다.");
        }

        await Product.findOneAndUpdate({ _id }, update);

        const product = await Product.findOne({ _id });
        if (update !== product) {
            console.error("상품 데이터 수정 실패");
            console.log(
                "---------------- 관리자 상품 데이터 수정 실패 ---------------------"
            );
            throw new Error("상품 데이터 수정에 실패하였습니다.");
        } else {
            console.log("수정된 상품 데이터 : ", product);
            console.log(
                "---------------- 관리자 상품 데이터 수정 성공 ---------------------"
            );
        }

        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 삭제 (비활성화) ------
router.delete("/products/:_id", verifyUser(true), async(req, res, next) => {
    console.log(
        "---------------- 관리자 상품 삭제(비활성화) 시도 ---------------------"
    );
    try {
        const { _id } = req.params;

        await Product.findOneAndUpdate({ _id }, { activate: false });
        console.log(
            "------------------ 관리자 주문 내역 조회 성공 ----------------------"
        );
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 전체 유저 주문 내역 조회 ------
router.get("/admin/orders", verifyUser(true), async(req, res, next) => {
    console.log("--------------- 관리자 주문 내역 조회 시도 ------------------");
    try {
        // 모든 주문내역 찾기
        const totalOrders = await Order.find({});
        if (!totalOrders) {
            console.error("관리자 : 존재하는 주문 내역이 없음.");
            console.log(
                "---------------- 관리자 주문 조회 실패 ---------------------"
            );
            throw new Error("관리자 :  존재하는 주문 내역이 없습니다.");
        } else {
            console.log(
                "---------------- 관리자 주문 내역 조회 성공 ---------------------"
            );
        }

        res.status(200).json(totalOrders);
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
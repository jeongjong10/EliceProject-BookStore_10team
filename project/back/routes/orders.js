const express = require("express");
const router = express.Router();
const { Order, User } = require("../models/index");
const verifyUser = require("../middleware/verifyUser");

// ------ USER: 현재 유저의 주문내역 조회 ------
router.get("/", async(req, res, next) => {
    console.log(
        "---------------- 사용자 주문 내역 조회 시도 ---------------------"
    );
    try {
        // 현재 유저 불러오기
        const verifiedUser_id = await verifyUser(req.headers);

        const orders = await Order.find({ userId: verifiedUser_id }); // 현재 유저의 주문내역 찾기

        if (!orders) {
            console.error("사용자의 주문 내역이 없습니다.")
            console.log(
                "---------------- 사용자 주문 조회 실패 ---------------------"
            );
            throw new Error("현재 사용자의 주문내역이 없습니다.");
        } else {
            const user = await User.findOne({ _id: verifiedUser_id });
            console.log(user.userName, "님의 주문 내역 : ", orders);
        }

        console.log(
            "---------------- 사용자 주문 내역 조회 성공 ---------------------"
        );
        res.status(200).json(orders);
    } catch (e) {
        next(e);
    }
});

// ------ USER: 현재 유저의 주문내역 저장 ------
router.post("/", async(req, res, next) => {
    console.log(
        "---------------- 사용자 주문 데이터 생성 시도 ---------------------"
    );
    try {
        // 현재 유저 불러오기
        const verifiedUser_id = await verifyUser(req.headers);

        // req.body: address(postalCode, address1, address2, recieverName, recieverPhone), 
        // orderNumber, comment, status, orderList(productName, count),
        // totalProductPrice, shipping, totalPrice

        const orders = req.body;
        if (!orders) {
            console.error("req.body 없음");
            console.log(
                "---------------- 요청 데이터 Body 확인 실패 -------------------"
            );
            throw new Error("req.body 내용이 없습니다.");
        }

        // userId는 직접 추가
        // User의 userId와 혼동이 올 수 있음 (쥬문의 userId에는 User의 _id 값이 들어가기 때문 )

        const newOrder = await Order.create({...orders, userId: verifiedUser_id });
        if (!newOrders) {
            console.error("생성된 주문 없음");
            console.log(
                "---------------- 사용자 주문 데이터 생성 실패 -------------------"
            );
            throw new Error("생성된 주문 없음");
        } else {
            console.log("새성된 주문 데이터 : ", newOrder);
        }

        console.log(
            "---------------- 사용자 주문 데이터 생성 성공 ---------------------"
        );
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

// ------ USER: 현재 유저의 주문내역 수정 ------
router.patch("/:_id", async(req, res, next) => {
    console.log(
        "---------------- 사용자 주문 내역 수정 시도 ---------------------"
    );
    try {
        // 현재 유저 불러오기
        const verifiedUser_id = await verifyUser(req.headers);

        const { _id } = req.params;

        if (!_id) {
            console.error("req.params 없음");
            console.log(
                "---------------- 요청 데이터 Param 확인 실패 ---------------------"
            );
            throw new Error("req.params가 없습니다.");
        }

        const updateOrder = req.body;

        if (!updateOrder) {
            console.error("req.body 없음");
            console.log(
                "---------------- 요청 데이터 Body 확인 실패 ---------------------"
            );
            throw new Error("req.body가 없습니다.");
        }

        await Order.findOneAndUpdate({ _id, userId: verifiedUser_id }, { updateOrder });
        const order = await Order.findOne({ _id, userId: verifiedUser_id });

        if (order === updateOrder) {
            console.log("수정된 주문 데이터 : ", order);
        } else {
            console.error("주문 내역 수정 실패");
            console.log(
                "---------------- 사용자 주문 내역 수정 실패 ---------------------"
            );
            throw new Error("주문 내역 수정에 실패하였습니다.");
        }

        console.log(
            "---------------- 사용자 주문 내역 수정 성공 ---------------------"
        );
        res.status(200).end;
    } catch (e) {
        next(e);
    }
});

// ------ USER: 현재 유저의 주문내역 삭제 (비활성화) ------
router.delete("/:_id", async(req, res, next) => {
    console.log(
        "---------------- 사용자 주문 내역 삭제(비활성화) 시도 ---------------------"
    );
    try {
        // 현재 유저 불러오기
        const verifiedUser_id = await verifyUser(req.headers);

        const { _id } = req.params;

        if (!_id) {
            console.error("req.params 없음");
            console.log(
                "---------------- 요청 데이터 Param 확인 실패 ---------------------"
            );
            throw new Error("req.params가 없습니다.");
        }

        await Order.findOneAndUpdate({ _id, userId: verifiedUser_id }, { activate: false });
        const order = await Order.findOne({ _id, userId: verifiedUser_id });

        if (order.activate == false) {
            console.log("사용자 주문 비활성화 완료 activate : ", order.activate);
        } else {
            console.error("사용자 주문 비활성화 실패");
            console.log(
                "---------------- 사용자 주문 내역 삭제(비활성화) 실패 ---------------------"
            );
            throw new Error("사용자 주문 삭제(비활성화) 실패");
        }

        console.log(
            "---------------- 사용자 주문 내역 삭제(비활성화) 성공 ---------------------"
        );
        res.status(200).end();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
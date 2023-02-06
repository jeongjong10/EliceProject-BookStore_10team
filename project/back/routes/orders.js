const express = require("express");
const router = express.Router();
const { Order, User } = require("../models/index");
const verifyUser = require("../middleware/verifyUser_middlewaring");

// ------ USER: 현재 유저의 주문내역 조회 ------
router.get("/", verifyUser(), async (req, res, next) => {
  try {
    // 현재 유저 불러오기

    const verifiedUser_id = req.verifiedUser_id;

    const orders = await Order.find({ userId: verifiedUser_id }); // 현재 유저의 주문내역 찾기

    if (!orders) {
      throw new Error("현재 유저의 주문내역이 없습니다.");
    }

    const user = await User.findOne({ _id: verifiedUser_id });
    console.log(user.userName, "님의 주문 조회");

    res.status(200).json(orders);
  } catch (e) {
    next(e);
  }
});

// ------ USER: 현재 유저의 주문내역 저장 ------
router.post("/", verifyUser(), async (req, res, next) => {
  try {
    // 현재 유저 불러오기
    const verifiedUser_id = req.verifiedUser_id;

    // req.body: address(postalCode, address1, address2, recieverName, recieverPhone), orderNumber, comment, status, orderList(productName, count), totalProductPrice, shipping, totalPrice
    const orders = req.body;

    if (!orders) {
      throw new Error("req.body 내용이 없습니다.");
    }

    // userId는 직접 추가
    // User의 userId와 혼동이 올 수 있음 (쥬문의 userId에는 User의 _id 값이 들어가기 때문 )
    await Order.create({ ...orders, userId: verifiedUser_id });
    res.status(200).end();
  } catch (e) {
    next(e);
  }
});

// ------ USER: 현재 유저의 주문내역 수정 ------
router.patch("/:_id", verifyUser(), async (req, res, next) => {
  try {
    // 현재 유저 불러오기
    const verifiedUser_id = req.verifiedUser_id;

    const { _id } = req.params;

    if (!_id) {
      throw new Error("req.params가 없습니다.");
    }

    const updateOrder = req.body;

    if (!updateOrder) {
      throw new Error("req.body가 없습니다.");
    }

    await Order.findOneAndUpdate(
      { _id, userId: verifiedUser_id },
      { updateOrder }
    );
    const order = await Order.findOne({ _id, userId: verifiedUser_id });

    if (order === updateOrder) {
      console.log("주문 내역 수정 완료 : ");
    } else {
      console.log("주문 내역 수정 실패 : ", updateOrder, order);
      throw new Error("주문 내역 수정에 실패하였습니다.");
    }

    res.status(200).end;
  } catch (e) {
    next(e);
  }
});

// ------ USER: 현재 유저의 주문내역 삭제 (비활성화) ------
router.delete("/:_id", verifyUser(), async (req, res, next) => {
  try {
    // 현재 유저 불러오기
    const verifiedUser_id = req.verifiedUser_id;

    const { _id } = req.params;

    if (!_id) {
      throw new Error("req.params가 없습니다.");
    }

    await Order.findOneAndUpdate(
      { _id, userId: verifiedUser_id },
      { activate: false }
    );
    const order = await Order.findOne({ _id, userId: verifiedUser_id });

    if (order.activate == false) {
      console.log("사용자 주문 비활성화 완료 : ", order.activate);
    } else {
      console.log("사용자 주문 비활성화 실패 : ", order.activate);
    }

    res.status(200).json({
      result: "success",
      message: "주문이 취소되었습니다.",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

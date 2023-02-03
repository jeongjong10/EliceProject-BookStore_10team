const router = express.Router();
const express = require("express");
const verifyUser = require("../utils/verifyUser");

console.log("------------------- 사용자 로그인 시도 ------------------------");


router.get('/order', async (req, res, next) => {
    try {
        console.log("------------------- 마이페이지(주문조회) 접근 ------------------------");
        // 마이페이지 접근시 (주문조회)
        const verifiedUser_id = await verifyUser(req.headers);

        // 유저  _id를 사용하여 주문 목록 불러오기
        const {orders} = await Order.find({verifiedUser_id});
        if (!orders) {
            console.error("사용자의 주문이 없습니다")
            console.log("------------------- 마이페이지 주문조회 실패 ------------------------");
            throw new Error("사용자의 주문 내역이 없습니다")
        }
        // 주문 목록 전송
        res.json(orders)
        console.log("주문 목록 전송 완료")
        console.log("------------------- 마이페이지 접근 성공 ------------------------");
    } catch(err) {
        next(err);
    }
})

router.get('/', async (req, res, next) => {
    // 수정, 관리 페이지 접근시
    try {
        console.log("-------------------  ------------------------");

        // 사용자 유효성 평가
        const {verifiedUser_id, activate} = await verifyUser(req.headers);
        
        // 유저 검색 후 데이터 전송

    } catch(err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    // 수정 요청시

    // 사용자 유효성 평가
    const {verifiedUser_id, activate} = await verifyUser(req.headers);

    // 유저 검색 후 

})

router.patch('/', async (req, res, next) => {
    // 회원 탈퇴 시도시

})


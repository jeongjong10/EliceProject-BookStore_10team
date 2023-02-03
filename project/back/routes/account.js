const express = require("express");
const router = express.Router();
const verifyUser = require("../utils/verifyUser");

// 마이페이지 접근시 (주문조회)
router.get('/order', async (req, res, next) => {
    try {
        console.log("------------------- 마이페이지(주문조회) 접근 ------------------------");
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

// 수정, 관리 페이지 접근시
router.get('/', async (req, res, next) => {
    try {
        console.log("-------------------  사용자 정보 관리 페이지 접근 ------------------------");

        // 사용자 유효성 평가
        const verifiedUser_id = await verifyUser(req.headers);
        
        // 유저 검색 후 데이터 전송
        const {user} = await User.findOne({verifiedUser_id});
        if (!user) {
            console.error("사용자의 정보가 없습니다")
            console.log("------------------- 마이페이지 정보 검색 실패 ------------------------");
            throw new Error("사용자의 정보가 없습니다")
        }
        res.json(user)
        console.log("사용자 정보 전송 완료")
        console.log("------------------- 사용자 정보 관리 페이지 접근 성공 ------------------------");

    } catch(err) {
        next(err);
    }
})

// 수정 요청시
router.post('/', async (req, res, next) => {
    console.log("---------------- 마이페이지 사용자 정보 수정 요청 ---------------------");
    try {
        // 사용자 유효성 평가
        const verifiedUser_id = await verifyUser(req.headers);
        
        // 수정 요청 데이터 확인
        const updateUser = await req.body;
        if (!updateUser) {
            console.error("req.body 확인 실패")
            console.log("------------------- 마이페이지 사용자 정보 수정 내역 확인 실패 ------------------------");
            throw new Error("req.body 확인에 실패하였습니다")
        }
        // 유저 검색 후 수정 내역 업데이트
        await User.findByIdAndUpdate(verifiedUser_id, updateUser);
        // 얘는 에러처리를 어떻게하지...?

    } catch(err) {
        next(err);
    }
})

// 회원 탈퇴 시도시
router.patch('/', async (req, res, next) => {
    console.log("---------------- 마이페이지 회원탈퇴 요청 ---------------------");
    try {
        // 사용자 유효성 평가
        const verifiedUser_id = await verifyUser(req.headers);
        
        // 유저 검색 후 수정 내역 업데이트
        await User.findByIdAndUpdate(verifiedUser_id, {activate: false});
        // 얘는 에러처리를 어떻게하지...?

    } catch(err) {
        next(err);
    }

})

module.exports = router;
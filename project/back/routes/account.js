const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const verifyUser = require("../middleware/verifyUser");
const {Order} = require("../models/index");
const {User} = require("../models/index");

// 마이페이지 접근시 (주문조회)
router.get('/order', async (req, res, next) => {
    try {
        console.log("------------------- 마이페이지(주문조회) 접근 ------------------------");
        const verifiedUser_id = await verifyUser(req.headers);

        // 유저  _id를 사용하여 주문 목록 불러오기
        // 주문 데이터가 만들어지면 테스트 가능할 예정
        const { orders } = await Order.find({_id:ObjectId(verifiedUser_id)});
        if (!orders) {
            console.error("사용자의 주문이 없습니다")
            console.log("------------------- 마이페이지 주문조회 실패 ------------------------");
            throw new Error("사용자의 주문 내역이 없습니다")
        }
        // 주문 목록 전송
        res.status(200).json(orders)
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
        const user = await User.findOne({_id:ObjectId(verifiedUser_id)});
        if (!user) {
            console.error("사용자의 정보가 없습니다")
            console.log("------------------- 마이페이지 정보 검색 실패 ------------------------");
            throw new Error("사용자의 정보가 없습니다")
        }
        res.status(200).json(user);
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
        const updateUser = req.body;
        if (!updateUser) {
            console.error("req.body 확인 실패")
            console.log("------------------- 마이페이지 사용자 정보 수정 내역 확인 실패 ------------------------");
            throw new Error("req.body 확인에 실패하였습니다")
        }
        // 유저 검색 후 수정 내역 업데이트
        // await User.findByIdAndUpdate({_id:ObjectId(verifiedUser_id)}, updateUser);
        const user = await User.findOneAndUpdate({_id:ObjectId(verifiedUser_id)},updateUser)
        // 얘는 에러처리를 어떻게하지...?

        res.status(200).json(user);
          console.log("------------------- 사용자 정보 수정 완료 ------------------------");

    } catch(err) {
        next(err);
    }
})

// 회원 탈퇴 시도시
router.delete('/', async (req, res, next) => {
    console.log("---------------- 마이페이지 회원탈퇴 요청 ---------------------");
    try {
        // 사용자 유효성 평가
        const verifiedUser_id = await verifyUser(req.headers);
        
        // 유저 검색 후 비활성화
        const user = await User.findByIdAndUpdate({_id:ObjectId(verifiedUser_id)}, { activate : false});

        /////// 위의 activate : false 가 적용되는 것을 데이터 베이스에서
        // 확인 가능한데, 아래 코드의 user.activate는 true라고 출력이 되네요...
        // await로 동기적으로 진행시켰는데도, 뒷코드가 먼저 실행 되는 건가요?..

        // // 비활성화 확인
        // if (user.activate == false) {
        //     console.log("사용자 계정 비활성화 완료 : ", user.activate)
        // } else {
        //     console.log("사용자 계정 비활성화 실패 : ", user.activate)
        // }

        res.status(200).json({
            // 우선 하드코딩으로 비활성 표기
            userActivate : false,
            // "userActivate" : user.activate,
          });
          console.log("------------------- 사용자 정보 비활성화 완료 ------------------------");
    } catch(err) {
        next(err);
    }

})

module.exports = router;
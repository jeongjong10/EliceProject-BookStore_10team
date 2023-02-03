const express = require("express");
const router = express.Router();
const User = require("../models/index");
const Order = require("../models/index");
const verifyUser = require("../utils/verifyUser");



// 마이페이지의 메인페이지 (주문리스트 받아오기)
router.get("/order", ,async (req, res, next) => {
    try {
        console.log("----------------- 사용자 마이페이지 접근 ---------------------");
        // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기
        const verifiedUserId = await verifyUser(req.header);
        if (!verifiedUserId) {
            console.error("JWT 토큰 불량")
            throw new Error("JWT 토큰 불량")
        } 
        
        // 테스트 필요
        const user = await User.findOne({verifiedUser_id});
        console.log("체이닝 테스트 user : ", user)
        const userId = await User.findOne({verifiedUser_id}).userId;
        console.log("체이닝 테스트 userId : ", userId)

        if (!userId) {
            console.error("JWT 토큰과 일치하는 사용자 데이터 없음")
            throw new Error("JWT 토큰과 일치하는 사용자 데이터 없음")
        }

        // 찾은 사용자의 주문 정보 찾기
        const userOrders = await Order.find({userId});
        if (!userOrders) {
            console.error("사용자의 주문을 찾을 수 없음")
            throw new Error("사용자의 주문을 찾을 수 없음")
        }

        // 사용자 주문 데이터 전송
        res.json(userOrders);
        console.log("--------------- 사용자 주문내역 전송 완료 --------------------");

    } catch(err) {
        next(err)
    }
})

// 수정, 관리 페이지 접근시 사용자 정보 요청
router.get("/", async (req, res, next) => {
    try {
        console.log("----------------- 사용자 정보 관리 페이지 접근 ---------------------");
        // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기
        const verifiedUser_id = await verifyUser(req.header);
        if (!verifiedUser_id) {
            console.log("verifiedUser_id가 없음")
            throw new Error("JWT 토큰 불량")
        } 
        const user = await User.findOne({verifiedUser_id});
        if (!user) {
            console.log("user가 없음")
            console.log("------------------- 사용자 인증 실패 ------------------------");
            throw new Error("JWT 토큰과 일치하는 사용자 데이터 없음")
        }

        // 사용자 데이터 전부 전송
        res.json(user);
        console.log("------------------- 사용자 정보 전송 완료 ------------------------");

        
    } catch(err) {
        next(err)
    }
})

// 수정, 관리 페이지에서 사용자 정보 수정 요청
router.post("/", async (req, res, next) => {
    try {
        console.log("----------------- 사용자 정보 수정 요청 ---------------------");
        // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기
        const verifiedUser_id = await verifyUser(req.header);
        if (!verifiedUser_id) {
            console.log("verifiedUser_id가 없음")
            throw new Error("JWT 토큰 불량")
        } 

        // 요청 바디에서 사용자 정보 받아 
        const userBody = await req.body
        if (!userBody) {
            console.error("요청 바디에 정보가 없음")
            throw new Error("요청 바디에 정보가 없음")
        }
        
        // 은수님에게 피드백 받기
        // User.findByIdAndUpdate({_id : verifiedUser_id}) 하여 정보 갱신
        await User.findByIdAndUpdate({_id : verifiedUser_id}, userBody)
        console.log("------------------- 사용자 정보 수정 완료 ------------------------");

    } catch(err) {
        next(err);
    }
})

// 회원탈퇴 요청시
router.patch("/", async (req, res, next) => {
    try {
        // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기
        const verifiedUser_id = await verifyUser(req.header);
        if (!verifiedUser_id) {
            console.log("verifiedUser_id가 없음")
            throw new Error("JWT 토큰 불량")
        } 

        const user = await User.findOne({verifiedUser_id});
        if (!user) {
            console.err("user가 없음")
            console.log("------------------- 사용자 인증 실패 ------------------------");
            throw new Error("JWT 토큰과 일치하는 사용자 데이터 없음")
        }
    
        // 삭제
        // 삭제로직을 어떻게 할것인가.
        await User.findByIdAndUpdate({_id : verifiedUser_id}, {activate : false})
        

    } catch(err) {
        next(err);
    }
})

module.exports = router;
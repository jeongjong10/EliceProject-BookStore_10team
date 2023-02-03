const express = require("express");
const router = express.Router();

router.get("/:", async (req, res, next) => {
    // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기

    // 사용자 데이터 전부 전송


})

// 수정, 관리 페이지 접근시 사용자 정보 요청
router.get("/", async (req, res, next) => {
    // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기

    // 사용자 데이터 전부 전송


})

// 수정, 관리 페이지에서 사용자 정보 수정
router.post("/", async (req, res, next) => {
    // 요청 받으면 헤더에서 토큰 추출 하여 user 확인 후 해당 _id값으로 사용자 찾기

    // 요청 바디에서 사용자 정보 받아 User.findByIdAndUpdate(id,) 하여 정보 갱신

    // 

})
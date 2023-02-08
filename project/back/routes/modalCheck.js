const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser_middlewaring");
const User = require("../models/index")

router.post("/", verifyUser(true), (req, res, next) => {
    console.log("------------------- 관리페이지 모달 PW 검사 실패 ------------------------");
    try {
        // 비밀번호 입력
        const password = req.body;

        // 비밀번호 일치 확인
        const user = User.findOne({_id : req.verifyUser_id})
        if (user.password !== getHash(password)) {
            console.error("사용자 입력 패스워드가 일치하지 않습니다");
            console.log("------------------- 관리페이지 모달 PW 검사 실패 ------------------------");
            throw new Error("사용자 입력 패스워드가 일치하지 않습니다");
        }
    } catch(err) {
        next(err);
    }
})

module.exports = router;
const express = require("express");
const asyncHandler = require("../utils/async-handler");
const router = express.Router();
const getHash = require("../utils/hash-password");
const { User } = require("../models/index");

// root 페이지
router.get("/", (req, res, next) => {
    res.send("root page !!!");
});

// 회원가입 패스 접근시 (회원가입 버튼 클릭시)
router.post(
    "/register",
    asyncHandler(async(req, res) => {
        try{
            // 정보 확인
            const { username, email, password } = req.body;
            // 유효성 검사

            // 유저 생성
            const hashedPassword = getHash(password);
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
            });
            
            // 성공 메세지
            console.log("신규 회원", user);
            res.status(201).send("회원가입 성공");
        } catch {
            res.status().send("회원가입 실패") // 에러 전송
        }
  
    })
);

module.exports = router;
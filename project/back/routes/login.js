const express = require("express");
const router = express.Router();
// const {User} = require("몽고디비")
const asyncHandler = require("../utils/async-handler");
const getHash = require("../utils/hash-password");
// jwt 생성 모듈
const generateToken = require('../utils/generateToken');


const { User } = require("../models/index");

// 로그인 패스 접근시 (로그인 버튼 클릭시)
router.post("/login",(req,res) => {
    try {
        // req에 담겨있는 정보 (아이디와 패스워드)를 받아서
        const {email, password} = req.body;

        // 데이터 베이스에 매칭되는 사용자 정보가 있는지 확인
        const user = User.findone({email});
        // user 가 없으면 매칭되는 이메일이 없다
        if (!user) {
            // 일치하는 이메일이 없음 -> 에러
            throw new Error("일치하는 사용자 이메일이 없음")
        }
        // 찾은 user의 비밀번호와 입력된 비밀번호가 일치하지 않는다.
        if (user.password !== getHash(password)) {
            // 비밀번호가 일치 하지 않음 -> 에러
            throw new Error("비밀번호가 일치하지 않음")
        }

        // 로그인 성공 jwt token 생성 
        const token = generateToken(user)
        // JWT 응답으로 전송
        res.send({
            message : "로그인 성공, 토큰 발급",
            JWT : token,
        })

    } catch(err) {
        res.err();
    }


})

module.exports = router;
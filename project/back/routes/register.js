const express = require("express");
const asyncHandler = require("../utils/async-handler");
const router = express.Router();
const getHash = require("../utils/hash-password");
const { User } = require("../models/index");

router.post(
    "/",
    asyncHandler(async(req, res, next) => {
        try {
            const { userName, email, password } = req.body;
            // ------ 에러1. 유니크 중복 ------
            const foundEmail = await User.findOne({ email });

            if (foundEmail) {
                res.status(400);
                next("이미 존재하는 이메일입니다.");
            }

            // ------ 유효성 검사 (예정) ------

            const hashedPassword = getHash(password);
            const user = await User.create({
                userName,
                email,
                password: hashedPassword,
            });

            console.log("신규 회원", user);
        } catch (e) {
            // ------ 에러2. 서버 관련 에러 ------
            res.status(500);
            next(e);
        }
    })
);

module.exports = router;
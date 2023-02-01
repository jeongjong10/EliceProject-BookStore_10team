const express = require("express");
const asyncHandler = require("../utils/async-handler");
const router = express.Router();
const getHash = require("../utils/hash-password");
const { User } = require("../models/index");

// root 페이지
router.get("/", (req, res, next) => {
    res.send("root page, 서버연결 완료");
});

router.get("/register", (req, res, next) => {
    console.log("회원가입");
});

router.post(
    "/register",
    asyncHandler(async(req, res) => {
        const { username, email, password } = req.body;
        const hashedPassword = getHash(password);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log("신규 회원", user);
        res.redirect("/");
    })
);

module.exports = router;
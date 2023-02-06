const express = require("express");
const router = express.Router();
const getHash = require("../utils/hash-password");
const { User } = require("../models/index");

router.post("/", async(req, res, next) => {
    try {
        const createUser = req.body;
        // ------ 에러) 유니크 중복 ------

        const foundEmail = await User.findOne({ email: createUser.email });

        if (foundEmail) {
            throw new Error("이미 존재하는 이메일입니다.");
        } else {
            // ------ 유효성 검사 (예정) ------

            const hashedPassword = getHash(createUser.password);
            const user = await User.create({
                ...createUser,
                password: hashedPassword,
            });

            console.log("신규 회원", user);
            res.status(200).end();
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
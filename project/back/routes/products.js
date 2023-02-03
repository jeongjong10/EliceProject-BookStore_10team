const express = require("express");
const router = express.Router();
const { Product, User } = require("../models/index");

// ------ USER: 전체 상품 조회 ------
router.get("/", async(req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (e) {
        next(e);
    }
});

// ------ USER: 개별 상품 조회 ------
router.get("/:_id", async(req, res, next) => {
    try {
        const { _id } = req.params;

        console.log(_id);

        const product = await Product.findOne({ _id });

        if (!product) {
            console.error("존재하지 않는 상품입니다.");
            throw new Error("존재하지 않는 상품입니다.");
        } else {
            console.log(product);
            res.json(product);
        }
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 등록 ------
router.post("/", async(req, res, next) => {
    try {
        const products = req.body;

        const product = await Product.create(products);

        console.log("상품 등록", product);
        res.status(201).send({ message: "상품 등록 성공" });
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 수정 ------
router.post("/:_id", async(req, res, next) => {
    try {
        const { _id } = req.params;
        const update = req.body;

        await Product.findOneAndUpdate({ _id }, update);

        res.status(201).send({ message: "상품 수정 성공" });
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 삭제 (비활성화) ------
router.patch("/:id", async(req, res, next) => {
    try {
        const { _id } = req.params;

        await Product.findOneAndUpdate({ _id }, { activate: false });
        res.status(201).send({ message: "상품 비활성화 성공" });
    } catch (e) {
        next(e);
    }
});

// 상품 id가 들어오면

module.exports = router;
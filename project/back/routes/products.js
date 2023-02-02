const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");

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
router.get("/:productId", async(req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ productId });

        if (product) res.json(product);
    } catch (e) {}
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

module.exports = router;
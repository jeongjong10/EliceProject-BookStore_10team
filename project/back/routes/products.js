const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");
const mongoose = require("mongoose");

// ------ USER: 전체 상품 조회 ------
router.get("/", async(req, res, next) => {
    try {
        // ------ 쿼리 스트링 ------
        const idList = req.query["_id"];
        let products;
        if (typeof idList !== "object") idList = [idList];
        else if (idList) {
            products = await Promise.all(
                idList.map(async(_id) => {
                    const product = await Product.findOne({
                        _id: mongoose.Types.ObjectId(_id),
                    });
                    return product;
                })
            );
        } else {
            products = await Product.find({});
        }

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

module.exports = router;
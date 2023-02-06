const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");
const mongoose = require("mongoose");

// ------ USER: 전체 상품 조회 ------
router.get("/", async(req, res, next) => {
    console.log("---------------- 전체 상품 조회 시도 ---------------------")
    try {
        const products = await Product.find({});

        // 상품을 찾지 못했을 경우 에러처리
        if (!products) {
            console.errer("상품 조회 실패")
            console.log("---------------- 상품 조회 실패 ---------------------")
            throw new Error("상품을 찾을 수 없습니다.");
        }

        console.log("---------------- 전체 상품 조회 성공 ---------------------")
        res.status(200).json(products);
    } catch (e) {
        next(e);
    }
});

// ------ USER: 개별 상품 조회 ------
router.get("/:_id", async(req, res, next) => {
    console.log("---------------- 개별 상품 조회 시도 ---------------------")

    try {
        const { _id } = req.params;

        if (!_id) {
            console.error("params 없음.");
            console.log("---------------- 요청 데이터 Params 확인 실패 ---------------------")
            throw new Error("params 내용이 없습니다.");
        }
        const id = mongoose.Types.ObjectId(_id);

        const product = await Product.findOne({ _id: id });
        if (!product) {
            console.error("상품 조회 실패.");
            console.log("---------------- 상품 조회 실패 ---------------------")
            throw new Error("존재하지 않는 상품입니다.");
        } else {
            console.log("조회된 상품 : ", product);
            console.log("---------------- 개별 상품 조회 성공 ---------------------")
            res.status(200).json(product);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");
const mongoose = require("mongoose");

// ------ USER: 전체 상품 조회 ------
router.get("/", async(req, res, next) => {
    try {
        // ------ 쿼리 스트링 ------
        let idList = req.query["_id"];
        let products;

        if (idList) {
            // 쿼리 파라미터가 있을 때
            if (typeof idList !== "object") idList = [idList]; // _id 값이 하나일 때 처리
            products = await Promise.all(
                idList.map(async(_id) => {
                    const product = await Product.findOne({
                        _id: mongoose.Types.ObjectId(_id),
                    });
                    return product;
                })
            );
        } else {
            // 쿼리 파라미터가 없을 때
            products = await Product.find({});
        }

        // 상품을 찾지 못했을 경우 에러처리
        if(!products) {
            throw new Error("상품을 찾을 수 없습니다.")
        }
        res.status(200).json({
            ...products,
            result : "true", 
            message : "전체 상품 확인, 전송 완료"
        });
    } catch (e) {
        next(e);
    }
});

// ------ USER: 개별 상품 조회 ------
router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    console.log(_id);

    const id = mongoose.Types.ObjectId(_id);

    const product = await Product.findOne({ _id: id });

        console.log(product);

        // 상품을 찾지 못했을 경우 에러처리
        if (!product) {
            console.error("존재하지 않는 상품입니다.");
            throw new Error("존재하지 않는 상품입니다.");
        } else {
        // 찾았을 경우 성공, 반환
            console.log(product);
            res.status(200).json({
                ...product,
                result : "true", 
                message : "개별 상품 확인, 전송 완료"
            });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
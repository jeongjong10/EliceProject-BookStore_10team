const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");
const mongoose = require("mongoose");

// ------ 카테고리 조회 ------
router.get("/", async(req, res, next) => {
    try {
        // 모든 상품의 카테고리 값을 불러와서 유니크 값만 뽑아준다.
        const products = await Product.find({});
    } catch (e) {
        next(e);
    }
});

// ------ 카테고리 수정 ------
router.get("/", async(req, res, next) => {
    try {
        // 모든 상품을 불러와서
        // 예?
        const products = await Product.find({});
    } catch (e) {
        next(e);
    }
});

// ------ 카테고리 삭제 (비활성화) ------
router.get("/", async(req, res, next) => {
    try {
        const products = await Product.find({});
    } catch (e) {
        next(e);
    }
});
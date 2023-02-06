const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");
const mongoose = require("mongoose");

// ------ USER: 전체 상품 조회 ------
router.get("/", async (req, res, next) => {
  try {
    // ------ 쿼리 스트링 ------
    let idList = req.query["_id"];
    let products;

    if (idList) {
      // 쿼리 파라미터가 있을 때
      if (typeof idList !== "object") idList = [idList]; // _id 값이 하나일 때 처리
      products = await Promise.all(
        idList.map(async (_id) => {
          const product = await Product.findOne({
            _id: mongoose.Types.ObjectId(_id),
          });
          return product;
        })
      );
    } else {
      // 쿼리 파라미터가 없을 때
      throw new Error("req.query['_id']가 존재하지 않습니다.");
    }

    // 상품을 찾지 못했을 경우 에러처리
    if (!products) {
      throw new Error("상품을 찾을 수 없습니다.");
    }
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

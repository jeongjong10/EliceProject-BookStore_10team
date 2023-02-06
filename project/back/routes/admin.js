const express = require("express");
const router = express.Router();
const { Product } = require("../models/index");
const verifyUser = require("../middleware/verifyUser_middlewaring");

// ------ ADMIN: 상품 등록 ------
router.post("/products", verifyUser(true), async (req, res, next) => {
  try {
    const products = req.body;

    const product = await Product.create(products);

    console.log("상품 등록", product);
    res.status(200).end();
  } catch (e) {
    next(e);
  }
});

// ------ ADMIN: 상품 수정 ------
router.post("/products/:_id", verifyUser(true), async (req, res, next) => {
  try {
    const { _id } = req.params;
    const update = req.body;

    await Product.findOneAndUpdate({ _id }, update);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
});

// ------ ADMIN: 상품 삭제 (비활성화) ------
router.delete("/products/:id", verifyUser(true), async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Product.findOneAndUpdate({ _id }, { activate: false });
    res.status(200).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;

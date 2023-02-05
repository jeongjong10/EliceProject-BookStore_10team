const { Product } = require("../models/index");

// ------ ADMIN: 상품 등록 ------
router.post("/products", async(req, res, next) => {
    try {
        // (예정) admin 확인로직

        const products = req.body;

        const product = await Product.create(products);

        console.log("상품 등록", product);
        res.status(200).send({ message: "상품 등록 성공" });
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 수정 ------
router.post("/products/:_id", async(req, res, next) => {
    try {
        // (예정) admin 확인로직

        const { _id } = req.params;
        const update = req.body;

        await Product.findOneAndUpdate({ _id }, update);

        res.status(200).send({ message: "상품 수정 성공" });
    } catch (e) {
        next(e);
    }
});

// ------ ADMIN: 상품 삭제 (비활성화) ------
router.delete("/products/:id", async(req, res, next) => {
    try {
        // (예정) admin 확인로직
        const { _id } = req.params;

        await Product.findOneAndUpdate({ _id }, { activate: false });
        res.status(200).send({ message: "상품 비활성화 성공" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
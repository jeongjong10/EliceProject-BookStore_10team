const express = require("express");
const router = express.Router();
const imageUploader = require("../middleware/imageUploader");
const verifyUser = require("../middleware/verifyUser_middlewaring");

router.post("/upload", imageUploader.single("image"), (req, res) => {
    // form data를 어떻게 받을 것인가? (body에 모든 데이터가 form data로 들어온다면 처리할 로직 생각하기. )

    res.send(req.file.location);
});

router.post(
    "/test",
    verifyUser(true),
    imageUploader.single("image"),
    async(req, res, next) => {
        console.log(
            "------------------- 관리자 상품 등록 시도 -----------------------"
        );
        console.log(req.body);
        console.log(req.file);
        console.log(req.file.location);
        const fileLocation = req.file.originalname;
        try {
            const { categoryName, productName } = req.body;
            res.status(200).json({
                categoryName: categoryName,
                productName: productName,
                image: fileLocation,
            });
        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;
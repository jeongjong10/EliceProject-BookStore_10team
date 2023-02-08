const express = require("express");
const router = express.Router();
const imageUploader = require("../utils/imageUploader");

router.post("/upload", imageUploader.single("image"), (req, res) => {
    console.log("오류1");
    res.send("이미지 업도드 완료!!");
});

module.exports = router;
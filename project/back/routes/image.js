const express = require("express");
const router = express.Router();
const imageUploader = require("../middleware/imageUploader");

router.post("/upload", imageUploader.single("image"), (req, res) => {
    // form data를 어떻게 받을 것인가? (body에 모든 데이터가 form data로 들어온다면 처리할 로직 생각하기. )

    res.send(req.file.location);
});

module.exports = router;
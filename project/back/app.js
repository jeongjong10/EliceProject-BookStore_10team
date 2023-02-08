const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const multer = require("multer");

// --- 필요한 라우터 require ---
const accountRouter = require("./routes/account");
const adminRouter = require("./routes/admin");
const cartlistRouter = require("./routes/cartlist");
const loginRouter = require("./routes/login");
const orderRouter = require("./routes/orders");
const productRouter = require("./routes/products");
const registerRouter = require("./routes/register");
const imageRouter = require("./routes/image");

// -------------------------

// ------ 몽고DB 연결 ------
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://10team:1111@10team.yfnfhkm.mongodb.net/test");
mongoose.connection.on("connected", () => {
    console.log("정상적으로 DB와 연결되었습니다.   MongoDB Connected");
    console.log("--------------------------------------------");
});
//------------------------

const app = express();

// ------ 미들웨어 등록 ------
app.use(cors());
app.use(express.json()); // post 메서드를 받기 위함 : req.body를 읽을 수 있음
app.use(express.urlencoded({ extended: false }));
//------------------------

// // ------ 이미지 업로드 관련 (임시) ------
// app.use("/images", express.static("public")); // images 경로를 통해 public 디렉토리에 포함된 파일을 로드할 수 있음.

// const storage = multer.diskStorage({
//     destination: "./public/img/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 형식 지정
//     },
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // 파일 사이즈 (단위는 byte)
// });

// app.post("/upload", upload.single("img"), (req, res, next) => {
//     res.send({
//         fileName: req.file.filename,
//     });
// });
//
// public/img에 업로드
// => 프론트에 filename 전송
// =>  상품 등록 페이지 이미지칸에 filename 입력
// => 상품등록 post할 때 DB에 filename 저장
// 그럼 이미지 접근은 localhost:3001/images/filename 이렇게??
//------------------------

// ------ 라우터 등록 ------
app.use("/account", accountRouter);
app.use("/admin", adminRouter); // 보류중
app.use("/cartlist", cartlistRouter);
app.use("/login", loginRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/register", registerRouter);
app.use("/image", imageRouter);
//------------------------

// ------ 오류처리 미들웨어 ------
app.use((err, req, res, next) => {
    res.json({
        result: "fail",
        message: err.message,
    });
});
//------------------------

module.exports = app;
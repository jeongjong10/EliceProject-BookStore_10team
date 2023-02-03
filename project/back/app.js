const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// --- 필요한 라우터 require ---
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const accountRouter = require("./routes/account");
const productRouter = require("./routes/products");
const adminRouter = require("./routes/admin");
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//------------------------

// ------ 라우터 등록 ------
app.use("/register", registerRouter);
app.use("/login", loginRouter);
// app.use("/account", accountRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);
//------------------------

// ------ 오류처리 미들웨어 ------
app.use((err, req, res, next) => {
    res.json({
        result: "fail",
        error: err.message,
    });
});
//------------------------

module.exports = app;
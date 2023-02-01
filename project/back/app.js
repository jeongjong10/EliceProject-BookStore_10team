const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes");
// ----- 필요한 모듈 require


// ------ 몽고DB 연결 ------
mongoose.connect("mongodb://127.0.0.1:27017/test");
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
});
//------------------------

// ------ 미들웨어 등록 ------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//------------------------


// ------ 라우터 등록 ------
app.use("/", indexRouter);

//------------------------


module.exports = app;
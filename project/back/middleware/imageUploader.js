const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

AWS.config.update({
  region: process.env.AWS_REGION, // AWS의 region 값
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// 업로드 가능한 이미지 확장자명 리스트 작성
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "10team-img-storage",
    key: (req, file, callback) => {
      // 버킷 내에 생성되어있는 products imgs 폴더에 업로드
      const uploadDirectory = "Books";

      // 확장자명 얻어오기
      const extension = path.extname(file.originalname);

      // 올바른 확장자 확인
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`); // 현재시간_파일이름 으로 이미지 파일 생성
    },
    acl: "public-read-write",
  }),
});

module.exports = imageUploader;

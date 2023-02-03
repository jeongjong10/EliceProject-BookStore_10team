const jwt = require("jsonwebtoken");

// 발급했던 토큰을 다시 받아서 검사할때 사용하는 기능
// req.headers의 데이터를 받아 jwt를 확인한다.
// jwt -> verify하면 -> user._id가 나오고
// 그 아이디를 이용해서 유저 확인


// 아직 미완성
module.exports = (reqHeaders) => {
    const { authorization } = reqHeaders;
    if (!authorization) {
        throw new Error("인증되지 않은 토큰")
    }
    const token = authorization.split(" ")[1];

        jwt.verify(token,"10team");

        // 토큰 확인 로직

        // 활성화 여부

        // 어드민 여부

        // 반환값은 _id, 어드민 여부
}

// verifyUser를 사용하는 라우터 단에서
// const verifiedUser_id = verifyUser(reqHeader);
// 로 변수에 받아서 사용
// ex) User.findOne({_Id : verifiedUser_id})

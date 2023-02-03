const jwt = require("jsonwebtoken");
const {User} = require("../models/index")

// 관리자 접근시 매개변수로 (reqHeaders,true)
// 그외 (reqHeaders)
const verifyUser = async (reqHeaders, isAdmin = false) => {
    // 토큰 확인 및 _id 추출 로직
    const { authorization } = reqHeaders;
    if (!authorization) {
        throw new Error("authorization 존재하지 않는다")
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        throw new Error("토큰이 존재하지 않는다")
    }

    const verifiedUser_id = await jwt.verify(token,"10team");
    if (!verifiedUser_id) {
        throw new Error("_id 값이 유효하지 않다")
    }

    const {admin, activate} = await User.findOne({verifiedUser_id})

    // 비활성화 계정 걸러주기
    if (!activate) {
        console.error("비활성 계정 입니다")
        return new Error("비활성 계정 입니다");
    }

    // 관리자 페이지에서 접근시
    if (isAdmin) {
        if (!admin) {
            console.error("관리자 계정이 아닙니다")
            return new Error("관리자 계정이 아닙니다");
        }
    }

    return verifiedUser_id;
}
module.exports = verifyUser;

// 발급했던 토큰을 다시 받아서 검사할때 사용하는 기능
// req.headers의 데이터를 받아 jwt를 확인한다.
// jwt -> verify하면 -> user._id가 나오고
// 그 아이디를 이용해서 유저 확인

// 더해서

// 확인한 유저의 활성화여부, 활성상태 아닐시 에러
// 확인한 유저의 어드민 여부, 아닐시 에러
// 반환값은 활성 상태인 _id, 어드민 여부

// verifyUser를 사용하는 라우터 단에서
// const {verifiedUser_id, admin, activate} = verifyUser(req.headers); 로 변수를 할당받고
// 원하는 곳에 사용

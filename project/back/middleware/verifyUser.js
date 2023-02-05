const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;

const { User } = require("../models/index")

// 코치님 아직 미들웨어 처럼 사용하는 법은 공부가 모자랍니다..ㅎㅎ




// 관리자 접근시 매개변수로 (reqHeaders,true)
// 그외 (reqHeaders)

const verifyUser = async (reqHeaders, isAdmin = false) => {
    try {
        // 토큰 확인 및 _id 추출 로직
        const { authorization } = reqHeaders;
        // console.log("authorization : ", authorization)

        if (!authorization) {
            console.error("Authorization 존재하지 않는다")
            throw new Error("Authorization 존재하지 않는다")
        }
    
        // 토큰 존재 확인
        const token = authorization.split(" ")[1];
        if (!token) {
            console.error("토큰이 존재하지 않는다")
            throw new Error("토큰이 존재하지 않는다")
        }
    
        // 최종적으로 jwt 토큰의 유효성 평가
        const verifiedUser_id = jwt.verify(token,"10team");
        if (!verifiedUser_id) {
            console.error("jwt 토큰이 유효하지 않다")
            throw new Error("jwt 토큰이 유효하지 않다")
        }
        // console.log("verifiedUser_id : ", verifiedUser_id)

        // 관리자 권한 및 사용자 계정 활성화 확인
        const user = await User.findOne({ _id:ObjectId(verifiedUser_id) });
        console.log(user);
        const {activate, admin} = user;
    
        // 비활성화 계정 에러
        if (!activate) {
            console.error("비활성 계정 입니다")
            return new Error("비활성 계정 입니다");
        }
    
        // 관리자 페이지에서 접근시 관리자 여부 에러
        if (isAdmin) {
            if (!admin) {
                console.error("관리자 계정이 아닙니다")
                return new Error("관리자 계정이 아닙니다");
            }
        }
        console.log("사용자 계정 확인 완료");
        return verifiedUser_id;

    } catch(err) {
        return err;
    }
}

module.exports = verifyUser;

/*
발급했던 토큰을 다시 받아서 검사할때 사용하는 기능
req.headers의 데이터를 받아서 jwt를 확인한다.
jwt -> verify하면 -> user._id가 나오고
그 아이디를 이용해서 유저 확인

더해서

사용자 계정의 활성화 여부, 활성상태 아닐시 에러
관리자 접근시 계정의 어드민 여부, 아닐시 에러

마지막으로 검증된 유저의 _id 값 반환 (verifiedUser_id)

verifyUser를 사용하는 라우터 단에서
const verifiedUser_id = verifyUser(req.headers); 
로 아이디를 변수에 담아주고, 유저 검색시 사용
*/

// const verifyUser = async (reqHeaders, isAdmin = false) => {
//     try {
//         // 토큰 확인 및 _id 추출 로직
//         const { authorization } = reqHeaders;
//         if (!authorization) {
//             console.error("authorization 존재하지 않는다")
//             throw new Error("authorization 존재하지 않는다")
//         }
    
//         // 토큰 존재 확인
//         const token = authorization.split(" ")[1];
//         if (!token) {
//             console.error("토큰이 존재하지 않는다")
//             throw new Error("토큰이 존재하지 않는다")
//         }
    
//         // 최종적으로 jwt 토큰의 유효성 평가
//         const verifiedUser_id = await jwt.verify(token,"10team");
//         if (!verifiedUser_id) {
//             console.error("jwt 토큰이 유효하지 않다")
//             throw new Error("jwt 토큰이 유효하지 않다")
//         }
    
//         // 관리자 권한 및 사용자 계정 활성화 확인
//         const {admin, activate} = await User.findOne({verifiedUser_id})
    
//         // 비활성화 계정 에러
//         if (!activate) {
//             console.error("비활성 계정 입니다")
//             return new Error("비활성 계정 입니다");
//         }
    
//         // 관리자 페이지에서 접근시 관리자 여부 에러
//         if (isAdmin) {
//             if (!admin) {
//                 console.error("관리자 계정이 아닙니다")
//                 return new Error("관리자 계정이 아닙니다");
//             }
//         }
//         return verifiedUser_id;
//     } catch(err) {
//         next(err);
//     }
// }

// module.exports = verifyUser;
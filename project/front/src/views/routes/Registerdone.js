import React from "react";
import { useNavigate } from "react-router-dom";
const Registerdone = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h1>회원가입이 완료되었습니다.</h1>
        <br />

        <button onClick={() => navigate("/login")}>로그인 하기</button>
      </form>
    </div>
  );
};

export default Registerdone;

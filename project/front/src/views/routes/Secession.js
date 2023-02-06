import React, { useState } from "react";
import { customAxios } from "../../config/customAxios";
import { useNavigate } from "react-router-dom";

const Secession = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onClickConfirmButton = async (event) => {
    event.preventDefault();
    await customAxios
      .delete("/account", { password })
      .then((response) => {
        if (response.data.message === "비밀번호가 일치하지 않음") {
          alert("비밀번호가 일치하지 않습니다.");
          window.location.reload();
        } else {
          alert("회원 탈퇴가 되었습니다.");
          navigate("/");
        }
      })
      .catch((e) => e.message);
  };
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
        <h3>비밀번호</h3>
        <input
          type="password"
          value={password}
          placeholder="******"
          onChange={onPasswordHandler}
        />
        <div>
          <button
            onClick={(event) => {
              onClickConfirmButton(event);
            }}
          >
            확인
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Secession;

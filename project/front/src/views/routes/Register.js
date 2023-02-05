import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../config/customAxios";
import { Regex } from "../components/Regex";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //입력 확인
    if (name.length < 2) {
      return alert("이름은 2글자  이상 입력해주세요.");
    } else if (!Regex(password)) {
      return alert("영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.");
    } else if (!Regex(email)) {
      return alert("이메일 형식이 맞지 않습니다.");
    } else if (password !== confirmPassword) {
      return alert("비밀번호가 비밀번호 확인과 일치하지 않습니다.");
    } else {
      return await customAxios
        .post("/register", {
          userName: name,
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.message === "이미 존재하는 이메일입니다.") {
            alert("이미 존재하는 이메일 입니다.");
            window.location.reload();
          } else {
            alert("정상적으로 회원가입되었습니다.");
            console.log(response.data);
            navigate("/registerdone");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h1>Sign Up</h1>
        <br />
        <div>이름</div>
        <input
          type="text"
          value={name}
          placeholder="엘리스"
          onChange={onNameHandler}
        />
        <div>이메일</div>
        <input
          type="email"
          value={email}
          placeholder="abc@example.com"
          onChange={onEmailHandler}
        />
        <div>비밀번호</div>
        <input
          type="password"
          value={password}
          placeholder="******"
          onChange={onPasswordHandler}
        />
        <div>비밀번호 확인</div>
        <input
          type="password"
          value={confirmPassword}
          placeholder="******"
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button
          onClick={(event) => {
            onSubmitHandler(event);
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;

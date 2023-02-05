import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";
import axios from "axios";
import { Regex } from "../components/Regex";

// JWT 만들때 user._id만 사용하는게 아니라 user.admin까지 사용해서 JWT 생성
// 화면단에서 JWT 분해 (atob => id, admin)
// TWT : {id: seklfasieofsa;oeijf, admin : true} 요론식으로 받아져야 할 거 같넹..

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (Regex(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (Regex(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const onClickConfirmButton = async (e) => {
    await axios
      .post("http://localhost:3001/login", { email, password })
      .then((response) => {
        if (response.data.message === "비밀번호가 일치하지 않음") {
          alert("비밀번호가 일치하지 않습니다.");
          window.location.reload();
        } else if (response.data.message === "일치하는 사용자 이메일이 없음") {
          alert("일치하는 사용자가 없습니다.");
          window.location.reload();
        } else {
          alert("로그인 완료");
          localStorage.setItem("JWT", response.data.JWT);
          navigate("/");
        }
      })
      .catch((e) => e.message);
  };

  return (
    <div className={styles.authFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          value={email}
          onChange={handleEmail}
          className={styles.input}
          type="email"
          placeholder="example@elice.com"
          id="email"
          name="email"
        />
        <div className={styles.errorMessageWrap}>
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요</div>
          )}
        </div>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={handlePassword}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        />
        <div className={styles.errorMessageWrap}>
          {!passwordValid && password.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          type="submit"
          className={styles.loginButton}
        >
          로그인
        </button>

        <button
          className={styles.linkButton}
          onClick={() => navigate("/Register")}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Login;

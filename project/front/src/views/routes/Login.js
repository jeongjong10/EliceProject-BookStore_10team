import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefalt();
    console.log(email);
  };

  return (
    <div className={styles.authFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label for="email" className={styles.label}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="email"
          placeholder="example@elice.com"
          id="email"
          name="email"
        />
        <div className="errorMessageWrap">올바른 이메일을 입력해주세요</div>
        <label for="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        />
        <div className="errorMessageWrap">
          영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
        </div>
        <button type="submit" className={styles.button}>
          로그인
        </button>
      </form>
      <button className={styles.button} onClick={() => navigate("/Register")}>
        회원가입
      </button>
    </div>
  );
};

export default Login;

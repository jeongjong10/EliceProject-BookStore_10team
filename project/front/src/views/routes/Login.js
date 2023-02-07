import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FloatingLabel,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import styles from "../css/Login.module.css";
import { customAxios } from "../../config/customAxios";
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
    await customAxios
      .post("/login", { email, password })
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
        <h1 className={styles.title}>로그인</h1>
        <FloatingLabel
          controlId="floatingInput"
          label="이메일 주소"
          className="mb-1"
          value={email}
          onChange={handleEmail}
          type="email"
          id="email"
          name="email"
        >
          <Form.Control type="email" placeholder="example@elice.com" />
        </FloatingLabel>
        <div className={styles.errorMessageWrap}>
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요</div>
          )}
        </div>
        <FloatingLabel
          controlId="floatingPassword"
          label="패스워드"
          className="mb-1"
          value={password}
          onChange={handlePassword}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <div className={styles.errorMessageWrap}>
          {!passwordValid && password.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="lg"
            className="mb-1"
            onClick={onClickConfirmButton}
            disabled={notAllow}
            type="submit"
          >
            로그인
          </Button>
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate("/Register")}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

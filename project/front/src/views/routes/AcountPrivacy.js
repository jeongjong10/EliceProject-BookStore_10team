import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, ListGroup, Nav } from "react-bootstrap";
import PopupDom from "../components/PopupDom";
import PopupPostCode from "../components/PopupPostCode";

const AcountPrivacy = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [number, setNumber] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const navigate = useNavigate();
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onAdressHandler = (event) => {
    setAdress(event.currentTarget.value);
  };
  const onNumberHandler = (event) => {
    setNumber(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    //입력확인
    if (password !== confirmPassword) {
      return alert("비밀번호가 비밀번호 확인과 일치하지 않습니다.");
    } else if (adress.length <= 0) {
      return alert("주소를 입력해주세요.");
    } else if (number.length !== 11) {
      return alert("전화번호를 다시 확인해주세요.");
    } else {
      return alert("저장이 완료되었습니다."), navigate("/");
    }
  };
  return (
    <Container>
      <Row>
        <Col xs lg="2">
          <form>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              주문조회
            </button>
            <br />
            <button
              onClick={() => {
                navigate("/account/secession");
              }}
            >
              회원 탈퇴
            </button>
          </form>
        </Col>
        <Col>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <h2>회원정보 관리</h2>
            <br />
            <div>이름</div>
            <input type="text" placeholder="엘리스" disabled />
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
            <div>우편번호</div>

            <input id="adress" type="text" />
            <button type="button" onClick={openPostCode}>
              검색
            </button>
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode onClose={closePostCode} />
                </PopupDom>
              )}
            </div>
            <div>상세 주소</div>
            <input
              type="text"
              value={adress}
              onChange={onAdressHandler}
              placeholder="엘리스아파트 엘리스동 엘리스호"
            />
            <div>전화번호</div>
            <input
              type="number"
              value={number}
              placeholder="- 없이 입력해 주세요."
              onChange={onNumberHandler}
            />
            <br />
            <button onClick={onSubmitHandler}>저장하기</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AcountPrivacy;

import React, { useState } from "react";
import { customAxios } from "../../config/customAxios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Stack } from "react-bootstrap";

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
          localStorage.removeItem("JWT");
          navigate("/");
        }
      })
      .catch((e) => e.message);
  };
  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Stack gap={3}>
              <button
                className="order"
                onClick={() => {
                  navigate("/account/orders");
                }}
              >
                주문조회
              </button>
              <button
                className="manager"
                onClick={() => {
                  navigate("/account/privacy");
                }}
              >
                개인정보관리
              </button>
              <button className="deleted">회원탈퇴</button>
            </Stack>
          </Col>
          <Col>
            <h1>회원탈퇴</h1>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Secession;

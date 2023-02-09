import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { customAxios } from "../../config/customAxios";
import { useNavigate } from "react-router-dom";

function AccountPrivacyModal({ show, onHide }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const onClickConfirmButton = async (e) => {
    e.preventDefault();
    await customAxios
      .post("/modalCheck", { password })
      .then((response) => {
        console.log("account axios" + response.data.message);
        if (
          response.data.message === "사용자 입력 패스워드가 일치하지 않습니다"
        ) {
          console.log("account axios failed");
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          console.log("account axios successful");
          alert("비밀번호가 일치합니다.");

          navigate("/account/privacy");
        }
      })
      .catch((e) => e.message);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                autoFocus
                value={password}
                onChange={handlePassword}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>닫기</Button>
          <Button
            onClick={(e) => {
              onClickConfirmButton(e);
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountPrivacyModal;

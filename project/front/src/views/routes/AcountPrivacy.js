import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssCart from "../css/Cart.module.css";
import cssOrder from "../css/Order.module.css";
import Post from "../components/Post";

const AcountPrivacy = () => {
  const navigate = useNavigate();

  const [receiverName, setReceiverName] = useState();
  const [receiverPassword, setReceiverPassword] = useState();
  const [receiverConfirmPassword, setReceiverConfirmPassword] = useState();
  const [receiverPhone, setReceiverPhone] = useState();
  const [address2, setAddress2] = useState();
  const [address, setAddress] = useState("");

  const [popup, setPopup] = React.useState(false);

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">회원 정보 관리</h2>
      </div>
      <Row>
        <Col xs lg="2">
          <Stack gap={3}>
            <button className="order">주문조회</button>
            <button className="manager">개인정보관리</button>
            <button className="deleted">회원탈퇴</button>
          </Stack>
        </Col>
        <Col className={cssOrder.deliveryInfo}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="username"
                placeholder="이름"
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                onChange={(e) => setReceiverPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                onChange={(e) => setReceiverConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                type="phone"
                placeholder="연락처 입력"
                onChange={(e) => setReceiverPhone(e.target.value)}
              />
              <Form.Text className="text-muted">예시) 01012345678</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>주소</Form.Label>
              <InputGroup>
                {address}
                <Button
                  className="mb-1"
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => {
                    setPopup(!popup);
                  }}
                >
                  주소 검색
                </Button>
                {popup && (
                  <Post address={address} setAddress={setAddress}></Post>
                )}
              </InputGroup>

              <Form.Control
                className="mb-1"
                type="text"
                placeholder="상세주소 입력"
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Group>
            <Button>저장</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AcountPrivacy;

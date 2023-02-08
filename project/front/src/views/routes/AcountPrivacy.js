import React, { useState, useEffect } from "react";
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
import { customAxios } from "../../config/customAxios";
import AccountPrivacyModal from "../components/AccountPrivacyModal";

const AcountPrivacy = () => {
  const navigate = useNavigate();

  const [receiverName, setReceiverName] = useState("");
  const [receiverPassword, setReceiverPassword] = useState("");
  const [receiverConfirmPassword, setReceiverConfirmPassword] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [address2, setAddress2] = useState("");
  const [address1, setAddress1] = useState("");

  const [zonecode, setZonecode] = useState("");
  const [modal, setModal] = useState(false);

  const [popup, setPopup] = React.useState(false);
  const [user, setUser] = useState([]);
  async function getData() {
    return await customAxios
      .get("/account")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setReceiverName(res.data.userName);
        if (res.data.phone) {
          setReceiverPhone(res.data.phone);
        }
        if (res.data.address.postalCode) {
          setZonecode(res.data.address.postalCode);
          setAddress1(res.data.address.address1);
          setAddress2(res.data.address.address2);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
    // 페이지 진입시 모달 설정
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (receiverPassword !== receiverConfirmPassword) {
      return alert("비밀번호가 비밀번호 확인과 일치하지 않습니다.");
    } else if (receiverPhone.length < 11) {
      return alert("연락처를 확인해주세요.");
    } else if (!receiverPassword.length || !receiverConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인을 입력해주세요.");
    } else {
      return await customAxios
        .post("/account", {
          userName: receiverName,
          password: receiverPassword,
          phone: receiverPhone,
          address: {
            postalCode: zonecode,
            address1: address1,
            address2: address2,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("회원 정보가 저장되었습니다.");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">회원 정보 관리</h2>
      </div>
      <Row>
        <Col xs lg="2">
          <Stack gap={3}>
            <button
              className="order"
              onClick={() => navigate("/account/orders")}
            >
              주문조회
            </button>
            <AccountPrivacyModal
              show={modal}
              onHide={() => {
                setModal(false);
              }}
            />
            <button
              className="manager"
              // onClick={(e) => {
              //   e.preventDefault();
              //   setModal(true);
              // }} 회원 정보 관리 페이지에서 모달 접근x
            >
              회원정보관리
            </button>
            <button
              className="deleted"
              onClick={() => navigate("/account/secession")}
            >
              회원탈퇴
            </button>
          </Stack>
        </Col>
        <Col className={cssOrder.deliveryInfo}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="username"
                placeholder="이름"
                defaultValue={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                defaultValue={receiverPassword}
                onChange={(e) => setReceiverPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                defaultValue={receiverConfirmPassword}
                onChange={(e) => setReceiverConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                type="phone"
                placeholder="연락처 입력"
                defaultValue={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
              />
              <Form.Text className="text-muted">예시) 01012345678</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>주소</Form.Label>
              <InputGroup>
                <Form.Control
                  className="mb-1"
                  placeholder="우편번호"
                  defaultValue={zonecode}
                />
                <Button
                  className="mb-1"
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => {
                    setPopup(!popup);
                  }}
                >
                  검색
                </Button>
                {popup && (
                  <Post
                    address1={address1}
                    setAddress1={setAddress1}
                    zonecode={zonecode}
                    setZonecode={setZonecode}
                  ></Post>
                )}
              </InputGroup>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="주소"
                defaultValue={address1}
              />
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="상세주소 입력"
                defaultValue={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={(event) => {
                onSubmitHandler(event);
              }}
            >
              저장
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AcountPrivacy;

import React, { useState } from "react";
import { Button, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { item } from "../../temp";
import cssCart from "../css/Cart.module.css";
import cssOrder from "../css/Order.module.css";

const Cart = () => {
  const navigate = useNavigate();

  const [receiverName, setReceiverName] = useState();
  const [receiverPhone, setReceiverPhone] = useState();
  const [postCode, setPostCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [selected, setSelected] = useState("");
  const [comment, setComment] = useState(null);

  const comments = {
    1: "직접 수령하겠습니다.",
    2: "배송 전 연락 바랍니다.",
    3: "부재 시 경비실에 맡겨주세요.",
    4: "부재 시 문 앞에 놓아주세요.",
    5: "부재 시 택배함에 넣어주세요.",
    6: "6",
  };

  // * 데이터 서버와 통신 연습
  // function handleSubmit() {
  //   axios
  //     .post("server주소...", {
  //       receiverName,
  //       receiverPhone,
  //       postCode,
  //       address1,
  //       address2,
  //       selected,
  //       comment,
  //     })
  //     .then((res) => {
  //       // status, code
  //       navigate("/order/complete");
  //     })
  //     .catch((err) => {
  //       alert("주문이 실패했습니다. 다시 시도해 주세요.");
  //       console.log(err);
  //     });
  // }

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">주문결제</h2>
      </div>
      <Row>
        <Col className={cssOrder.deliveryInfo}>
          <h3>배송지 정보</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="username"
                placeholder="이름"
                onChange={(e) => setReceiverName(e.target.value)}
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
                <Form.Control
                  className="mb-1"
                  placeholder="우편번호"
                  // readOnly
                  onChange={(e) => setPostCode(e.target.value)}
                />
                <Button
                  className="mb-1"
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  검색
                </Button>
              </InputGroup>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="주소"
                value=""
                // readOnly
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="상세주소 입력"
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>요청사항</Form.Label>
              <Form.Select
                className="mb-1"
                placeholder="배송시 요청사항을 선택해 주세요."
                onChange={(e) => {
                  setSelected(comments[e.target.value]);
                }}
              >
                <option>배송시 요청사항을 선택해 주세요.</option>
                <option value="1">직접 수령하겠습니다.</option>
                <option value="2">배송 전 연락 바랍니다.</option>
                <option value="3">부재 시 경비실에 맡겨주세요.</option>
                <option value="4">부재 시 문 앞에 놓아주세요.</option>
                <option value="5">부재 시 택배함에 넣어주세요.</option>
                <option value="6">직접 입력</option>
              </Form.Select>
              {/* value가 6일 때만 나오게 로직 짜야 함 */}
              {selected == "6" && (
                <Form.Control
                  type="text"
                  placeholder="직접 입력"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              )}
            </Form.Group>
          </Form>
        </Col>
        <Col xs lg="3">
          <Row className={cssCart.orderInfo}>
            <h3>결제 정보</h3>
            <div>
              <div className={cssCart.info}>
                <p>주문 상품</p>
                <div className={cssCart.orderList}>
                  <p>주문 상품 / n 개</p>
                  <p>주문 상품 / n 개</p>
                  <p>주문 상품 / n 개</p>
                </div>
              </div>
              <div className={cssCart.info}>
                <p>총 상품금액</p>
                <p>123456789789</p>
              </div>
              <div className={cssCart.info}>
                <p>배송비</p>
                <p>3,000</p>
              </div>
            </div>
            <div className={cssCart.result}>
              <p>총 결제금액</p>
              <h4>123,456 원</h4>
            </div>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    // * 데이터 서버와 통신
                    // handleSubmit();
                    navigate("/order/complete"); // 나중에 지워야 됨
                  }}
                >
                  결제하기
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

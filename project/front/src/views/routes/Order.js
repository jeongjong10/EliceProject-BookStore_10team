import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../config/customAxios";
import axios from "axios";
import cssCart from "../css/Cart.module.css";
import cssOrder from "../css/Order.module.css";
import Post from "../components/Post";

const Cart = () => {
  const navigate = useNavigate();

  const [receiverName, setReceiverName] = useState();
  const [receiverPhone, setReceiverPhone] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [selected, setSelected] = useState("");
  const [comment, setComment] = useState(null);
  const [finalCommentReq, setFinalCommentReq] = useState(""); // 서버에 보낼 comment
  const [popup, setPopup] = React.useState(false); // 주소검색

  const comments = {
    0: "",
    1: "직접 수령하겠습니다.",
    2: "배송 전 연락 바랍니다.",
    3: "부재 시 경비실에 맡겨주세요.",
    4: "부재 시 문 앞에 놓아주세요.",
    5: "부재 시 택배함에 넣어주세요.",
    6: "6",
  };

  // 로컬스토리지 cart 데이터 가공
  let carts = JSON.parse(localStorage.getItem("cart"));

  let cartItemsId = [];
  if (carts) {
    cartItemsId = carts.map((v, i) => v._id);
  }

  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // query parameter로 보내야 하는 URL 가공
  function getRouteURL() {
    let routeURL = "/cartlist?";
    cartItemsId.map((v, i) => {
      routeURL += `_id=${v}&`;
    });
    routeURL = routeURL.slice(0, -1);
    return routeURL;
  }
  // ex ) /cartlist?_id=63dcd6803f53abb02db79241&_id=63e0900cffeb097384da75b3

  // 데이터 통신 : get
  const [products, setProducts] = useState([]);

  async function getData() {
    Promise.all(
      [`${getRouteURL()}`, "/account"].map((url) => customAxios.get(url))
    )
      .then(
        axios.spread((res1, res2) => {
          // res1 : 상품 데이터
          if (res1.data.result !== "fail") {
            const data = res1.data;
            data.map((v, i) => {
              v["count"] = carts.filter((f) => f._id == v._id)[0].count;
            }); // 데이터에 count 데이터 추가

            setProducts(data);
            const tpp = data.reduce((a, b) => {
              return a + b.price * b.count;
            }, 0);
            setTotalProductPrice(tpp);

            const tp = data.reduce((a, b) => {
              return a + b.price * b.count;
            }, 3000);
            setTotalPrice(tp);
          }
          // res2 : 유저 데이터
          if (res2.data.hasOwnProperty("_id")) {
            setReceiverName(res2.data.userName);

            if (res2.data.address) {
              setAddress1(res2.data.address.address1);
              setAddress2(res2.data.address.address2);
              setZonecode(res2.data.address.postalCode);
            }
            if (res2.data.phone) {
              setReceiverPhone(res2.data.phone);
            }
          }
        })
      )
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  // 주문 요청사항 useEffect 처리
  useEffect(() => {
    if (selected.length > 3) {
      setFinalCommentReq(selected);
    } else if (comment !== null) {
      setFinalCommentReq(comment);
    }
  }, [selected, comment]);

  // 데이터 통신 : post
  const orderList = products.map((v, i) => {
    const obj = {
      productName: v.productName,
      count: v.count,
    };
    return obj;
  });

  async function postNewOrder() {
    const params = {
      address: {
        postalCode: zonecode,
        address1: address1,
        address2: address2,
        recieverName: receiverName,
        recieverPhoneNumber: receiverPhone,
      },
      orderList,
      comment: finalCommentReq,
      totalProductPrice: totalProductPrice,
      totalPrice,
      status: "배송 준비 중",
      shipping: 3000,
    };
    console.log("params", params);
    return await customAxios
      .post("/orders", JSON.stringify(params))
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("orderNumber", res.data.orderNumber);
      })
      .catch((err) => console.log(err));
  }

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
                defaultValue={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
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
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>주소</Form.Label>
              <InputGroup>
                <Form.Control
                  className="mb-1"
                  placeholder="우편번호"
                  defaultValue={zonecode}
                  onChange={(e) => setZonecode(e.target.value)}
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
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="상세주소 입력"
                defaultValue={address2}
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
                <option value="0">배송시 요청사항을 선택해 주세요.</option>
                <option value="1">직접 수령하겠습니다.</option>
                <option value="2">배송 전 연락 바랍니다.</option>
                <option value="3">부재 시 경비실에 맡겨주세요.</option>
                <option value="4">부재 시 문 앞에 놓아주세요.</option>
                <option value="5">부재 시 택배함에 넣어주세요.</option>
                <option value="6">직접 입력</option>
              </Form.Select>
              {/* comment 직접 입력 */}
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
              <div className={cssOrder.orderProductsList}>
                <p>주문 상품</p>
                <div className={cssCart.orderList}>
                  {products.map((v, i) => {
                    return (
                      <p key={i}>
                        {v.productName} / {v.count} 개
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className={cssCart.info}>
                <p>총 상품금액</p>
                <p>{totalProductPrice.toLocaleString("en-US")} 원</p>
              </div>
              <div className={cssCart.info}>
                <p>배송비</p>
                <p>3,000 원</p>
              </div>
            </div>
            <div className={cssCart.result}>
              <p>총 결제금액</p>
              <h4>{totalPrice.toLocaleString("en-US")} 원</h4>
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
                    postNewOrder();
                    // navigate("/order/complete"); // 나중에 지워야 됨
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

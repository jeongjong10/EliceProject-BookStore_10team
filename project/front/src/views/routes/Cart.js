import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssCart from "../css/Cart.module.css";
import { customAxios } from "../../config/customAxios";

const Cart = () => {
  const navigate = useNavigate();

  // 로컬스토리지 cart 데이터 가공
  let carts = JSON.parse(localStorage.getItem("cart"));

  const [totalCount, setTotalCount] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  let cartItemsId = [];
  if (carts) {
    cartItemsId = carts.map((v, i) => v._id);
  }

  // query parameter로 보내야 하는 URL 가공
  let routeURL = "/cartlist?";
  function getRouteURL() {
    cartItemsId.map((v, i) => {
      routeURL += `_id=${v}&`;
    });
    routeURL = routeURL.slice(0, -1);
  }
  getRouteURL();
  // ex ) /cartlist?_id=63dcd6803f53abb02db79241&_id=63e0900cffeb097384da75b3

  // 데이터 통신
  const [products, setProducts] = useState([]);

  async function getData() {
    return await customAxios
      .get(`${routeURL}`)
      .then((res) => {
        if (res.data.result !== "fail") {
          const data = res.data;
          data.map((v, i) => {
            v["count"] = carts.filter((f) => f._id == v._id)[0].count;
          }); // 데이터에 count 데이터 추가

          setProducts(data);

          const tc = data.reduce((a, b) => {
            return a + b.count;
          }, 0);
          setTotalCount(tc);

          const tpp = data.reduce((a, b) => {
            return a + b.price * b.count;
          }, 0);
          setTotalProductPrice(tpp);

          const tp = data.reduce((a, b) => {
            return a + b.price * b.count;
          }, 3000);
          setTotalPrice(tp);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  // 수량
  function handleCountUp(i, sign) {
    const newProducts = [...products];
    if (sign == "+") {
      newProducts[i].count += 1;
      setTotalCount(totalCount + 1);
      setTotalProductPrice(totalProductPrice + newProducts[i].price);
      setTotalPrice(totalPrice + newProducts[i].price);
    } else {
      if (newProducts[i].count > 1) {
        newProducts[i].count -= 1;
        setTotalCount(totalCount - 1);
        setTotalProductPrice(totalProductPrice - newProducts[i].price);
        setTotalPrice(totalPrice - newProducts[i].price);
      } else {
        alert("1개 이상 구매 가능합니다.");
      }
    }
    setProducts(newProducts);

    const localStorageCart = newProducts.map((v, i) => {
      return { _id: v._id, count: v.count };
    });
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
  }

  // 개별 삭제
  function removeProduct(id) {
    cartItemsId = cartItemsId.filter((f) => f !== id);
    setProducts(products.filter((f) => f._id !== id));
    carts = carts.filter((f) => f._id !== id);
    localStorage.setItem("cart", JSON.stringify(carts));
  }

  // 전체삭제 : 모달에 들어갈 onClick
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function removeAllProducts() {
    cartItemsId = [];
    setProducts([]);
    carts = [];
    localStorage.removeItem("cart");
    handleClose();
  }

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">장바구니</h2>
        <Button variant="secondary" onClick={handleShow}>
          전체 삭제
        </Button>
      </div>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>총 가격</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carts == null && (
                <tr>
                  <td colSpan={5} className={cssCart.emptyCart}>
                    <h4>
                      🤔 장바구니에 담긴 상품이 없습니다.
                      <br />
                      <Button
                        variant="secondary"
                        className="mt-3"
                        onClick={() => {
                          navigate("/product/list");
                        }}
                      >
                        상품 보러 가기
                      </Button>
                    </h4>
                  </td>
                </tr>
              )}
              {carts &&
                products.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td className={cssCart.tdAlignLeft}>
                        <img
                          src={v.img}
                          className={`${cssCart.productThumbnail}`}
                        />
                        {v.productName}
                      </td>
                      <td>{v.price.toLocaleString("en-US")}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          className={cssCart.qtyButton}
                          onClick={() => {
                            handleCountUp(i, "+");
                          }}
                        >
                          +
                        </Button>
                        <p className={cssCart.qty}>
                          {v.count}
                          {/* 주문데이터 -> 수량 */}
                        </p>
                        <Button
                          variant="outline-secondary"
                          className={cssCart.qtyButton}
                          onClick={() => {
                            handleCountUp(i, "-");
                          }}
                        >
                          -
                        </Button>
                      </td>
                      <td>
                        {(v.price * v.count).toLocaleString("en-US")}
                        {/* 주문 수량 곱해줘야 함 */}
                      </td>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            removeProduct(v._id);
                          }}
                        >
                          삭제
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
        <Col xs lg="3">
          <Row className={cssCart.orderInfo}>
            <h3>결제 정보</h3>
            <div>
              <div className={cssCart.info}>
                <p>상품수</p>
                <div className={cssCart.orderList}>
                  <p>{totalCount}</p>
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
                    if (localStorage.getItem("JWT")) {
                      navigate("/order");
                    } else {
                      alert(
                        "회원만 주문이 가능합니다. 로그인 페이지로 이동시켜 드릴께요. 🚗"
                      );
                      navigate("/login");
                    }
                  }}
                >
                  구매하기
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 전체삭제 Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>전체 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 모든 상품을 지우시겠어요? 😱</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={removeAllProducts}>
            전체 삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;

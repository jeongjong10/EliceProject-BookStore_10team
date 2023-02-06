import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssCart from "../css/Cart.module.css";
import { customAxios } from "../../config/customAxios";

const Cart = () => {
  // 로컬스토리지 cart 데이터 가공
  let carts = JSON.parse(localStorage.getItem("cart"));

  let cartItemsId = [];
  if (carts) {
    cartItemsId = carts.map((v, i) => v._id);
  }

  // query parameter로 보내야 하는 URL 가공
  let routeURL = "/cartlist?";
  function test() {
    cartItemsId.map((v, i) => {
      routeURL += `_id=${v}&`;
    });
    routeURL = routeURL.slice(0, -1);
  }
  test();
  // ex ) /cartlist?_id=63dcd6803f53abb02db79241&_id=63e0900cffeb097384da75b3

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  // const [count]
  async function getData() {
    return await customAxios
      .get(`${routeURL}`)
      .then((res) => {
        const data = res.data;
        console.log("res.data", data);
        data.map((v, i) => {
          v["count"] = carts.filter((f) => f._id == v._id)[0].count;
        });
        setProducts(data);
        setCount(data.count);
        console.log(data.count);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  // console.log(products);
  // console.log(count);
  // ! 개별 삭제. 테스트 필요
  function removeProduct(id) {
    cartItemsId = cartItemsId.filter((f) => f !== id);
    setProducts(products.filter((f) => f._id !== id));
    carts = carts.filter((f) => f._id !== id);
    localStorage.setItem("cart", JSON.stringify(carts));
  }

  // ! 전체삭제 : 얘는 모달에 들어갈 onClick
  function removeAllProducts() {
    cartItemsId = [];
    setProducts([]);
    carts = [];
    localStorage.removeItem("cart");
  }

  // 전체 삭제 버튼누르면 -> show가 true로 바끼구 모달이 뜬다
  // 모달에다가 원래 show={false} 넣어주고..

  const navigate = useNavigate();

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">장바구니</h2>
        <Button variant="secondary">전체 삭제</Button>
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
                      <td>{v.price}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          className={cssCart.qtyButton}
                          // onClick={() => {
                          //   setCount(count + 1);
                          // }}
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
                        >
                          -
                        </Button>
                      </td>
                      <td>
                        {v.price}
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
                  <p>3</p>
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
                    navigate("/order");
                  }}
                >
                  구매하기
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

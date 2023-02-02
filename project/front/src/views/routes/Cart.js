import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { item } from "../../temp";
import cssCart from "../css/Cart.module.css";

const Cart = () => {
  // 로컬스토리지 cart 데이터 가공
  const carts = JSON.parse(localStorage.getItem("cart"));
  const cartItemsId = carts.map((v, i) => v.itemId);

  // 로컬스토리지 id <-> 상품데이터 id 비교
  // 비교 후 데이터 출력을 위한 extractPrd 배열에 push
  let extractPrd = [];
  cartItemsId.map((localStorageId, i) => {
    item.map((item, i) => {
      if (localStorageId == item.itemId) {
        extractPrd.push(item);
      }
    });
  });

  console.log(extractPrd);
  const navigate = useNavigate();

  const [total, setTotal] = useState([]);

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
              {!localStorage.key("cart") && (
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
              {localStorage.key("cart") &&
                extractPrd.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td className={cssCart.tdAlignLeft}>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                          className={`${cssCart.productThumbnail}`}
                        />
                        {v.itemName}
                      </td>
                      <td>{v.price}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          className={cssCart.qtyButton}
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
                        <Button variant="secondary">삭제</Button>
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

import React from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { item } from "../../temp";
import cssCart from "../css/Cart.module.css";

const Cart = () => {
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
              <tr>
                {/* table start */}
                <td className={cssCart.tdAlignLeft}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                    className={`${cssCart.productThumbnail}`}
                  />
                  {item[0].itemName}
                </td>
                <td>{item[0].price}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    className={cssCart.qtyButton}
                  >
                    +
                  </Button>
                  <p className={cssCart.qty}>3{/* 주문데이터 -> 수량 */}</p>
                  <Button
                    variant="outline-secondary"
                    className={cssCart.qtyButton}
                  >
                    -
                  </Button>
                </td>
                <td>
                  {item[0].price}
                  {/* 주문 수량 곱해줘야 함 */}
                </td>
                <td>
                  <Button variant="secondary">삭제</Button>
                </td>
              </tr>
              <tr>
                {/* table start */}
                <td className={cssCart.tdAlignLeft}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                    className={`${cssCart.productThumbnail}`}
                  />
                  {item[0].itemName}
                </td>
                <td>{item[0].price}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    className={cssCart.qtyButton}
                  >
                    +
                  </Button>
                  <p className={cssCart.qty}>3{/* 주문데이터 -> 수량 */}</p>
                  <Button
                    variant="outline-secondary"
                    className={cssCart.qtyButton}
                  >
                    -
                  </Button>
                </td>
                <td>
                  {item[0].price}
                  {/* 주문 수량 곱해줘야 함 */}
                </td>
                <td>
                  <Button variant="secondary">삭제</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

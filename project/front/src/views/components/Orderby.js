import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Nav,
  Stack,
  Tab,
  Tabs,
  Button,
  Table,
} from "react-bootstrap";
import cssCart from "../css/Cart.module.css";
import { item } from "../../orders";

export const Orderby = () => {
  const HandlerPlus = (e) => {
    e.amount += 1;
  };

  const HandlerM = (e) => {
    e.amount -= 1;
  };
  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>상품명</th>
                  <th>주문날짜</th>
                  <th>수량</th>
                  <th>배송상태</th>
                  <th>가격</th>
                  <th>수정</th>
                  <th>주문취소</th>
                </tr>
              </thead>
              <tbody>
                {item.map((item, index) => {
                  if (item.deliver === "state") {
                    return (
                      <tr>
                        {/* table start */}
                        <td>{item.itemId}</td>
                        <td className={cssCart.tdAlignLeft}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                            className={`${cssCart.productThumbnail}`}
                          />
                          {item.itemName}
                        </td>
                        <td>{item.orderday}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            className={cssCart.qtyButton}
                            value="item"
                            onClick={HandlerPlus}
                          >
                            -
                          </Button>
                          <p className={cssCart.qty}>{item.amount}</p>
                          <Button
                            variant="outline-secondary"
                            className={cssCart.qtyButton}
                            value="item"
                            onClick={HandlerM}
                          >
                            +
                          </Button>
                        </td>
                        <td>배송대기</td>
                        <td>{item.amount * item.price}</td>
                        <td>
                          <Button>적용</Button>
                        </td>
                        <td>
                          <Button>주문취소</Button>
                        </td>
                      </tr>
                    );
                  } else if (item.deliver === "ready") {
                    return (
                      <tr>
                        {/* table start */}
                        <td>{item.itemId}</td>
                        <td className={cssCart.tdAlignLeft}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                            className={`${cssCart.productThumbnail}`}
                          />
                          {item.itemName}
                        </td>
                        <td>{item.orderday}</td>
                        <td>
                          <p className={cssCart.qty}>{item.amount}</p>
                        </td>
                        <td>배송중</td>
                        <td>{item.amount * item.price}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

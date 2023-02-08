import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-bootstrap";
import cssAccount from "../css/Account.module.css";
import { item } from "../../orders";
import { ModalCancel } from "./ModalCancel";

import { OrderProduct } from "./OrderProduct";
import { customAxios } from "../../config/customAxios";

export const OrderReady = () => {
  const [orders, setOrders] = useState([]);

  async function getData() {
    return await customAxios.get("/account/order").then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const TbodyReadyorders = (orders) => {
    if (!orders.length) {
      return (
        <tr>
          <h>주문내역이 존재하지 않습니다.</h>
        </tr>
      );
    } else {
      orders.map((orders, index) => {
        if (orders.status === "배송중") {
          return (
            <tr key={index}>
              <td>{orders.orderNumber}</td>
              <td className={cssAccount.tdAlignLeft}>
                {/* <img
                  src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                  className={`${cssAccount.productThumbnail}`}
                /> */}
                {OrderProduct(orders)}
              </td>
              <td>{orders.createdAt.slice(0, 10)}</td>
              {/* <td>
                <p className={cssAccount.qty}>
                  {orders.orderList.count}
                </p>
              </td> */}
              <td>{orders.status}</td>
              <td>{orders.totalPrice}</td>
              {console.log(orders._id)}
              <td>
                <ModalCancel orderId={orders._id} />
              </td>
            </tr>
          );
        }
      });
    }
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
                  {/* <th>수량</th> */}
                  <th>배송상태</th>
                  <th>가격</th>
                  {/* <th>수정</th> */}
                  <th>주문취소</th>
                </tr>
              </thead>
              <tbody>{TbodyReadyorders(orders)}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

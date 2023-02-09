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
import { customAxios } from "../../config/customAxios";
import { OrderProduct } from "./OrderProduct";

export const OrderStatus = () => {
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
              <tbody>
                {orders.map((orders, index) => {
                  if (orders.status === "배송준비") {
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
                        <td>
                          <ModalCancel orderId={orders._id} />
                        </td>
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

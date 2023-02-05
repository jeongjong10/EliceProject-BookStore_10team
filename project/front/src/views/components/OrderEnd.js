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
} from "react-bootstrap";
import cssAccount from "../css/Account.module.css";

import { ModalCancel } from "./ModalCancel";
import axios from "axios";
import { customAxios } from "../../config/customAxios";

export const OrderEnd = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("JWT") || "";
  async function getData() {
    return await customAxios
      .get("/account/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   async function fetchAndSetUser() {
  //     try {
  //       const response = await customAxios.get("/account/order");
  //       console.log(response);
  //       console.log(localStorage.getItem("JWT"));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchAndSetUser();
  // }, [orders]);

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
                </tr>
              </thead>
              <tbody>
                {orders.map((orders, index) => {
                  if (orders.status === "배송완료") {
                    return (
                      <tr>
                        <td>{orders.orderNumber}</td>
                        <td className={cssAccount.tdAlignLeft}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                            className={`${cssAccount.productThumbnail}`}
                          />
                          {orders.orderList.productName}
                        </td>
                        <td>{orders.createdAt}</td>
                        <td>
                          <p className={cssAccount.qty}>
                            {orders.orderList.count}
                          </p>
                        </td>
                        <td>배송완료</td>
                        <td>{orders.totalPrice}</td>
                        <td>
                          <ModalCancel />
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

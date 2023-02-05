import React, { useState } from "react";
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
import axios from "axios";

export const OrderStatus = () => {
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
                  {/* <th>수정</th> */}
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
                        <td className={cssAccount.tdAlignLeft}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                            className={`${cssAccount.productThumbnail}`}
                          />
                          {item.itemName}
                        </td>
                        <td>{item.orderday}</td>
                        <td>
                          {/* <Button
                            variant="outline-secondary"
                            className={cssAccount.qtyButton}
                            value="item"
                            onClick={HandlerPlus}
                          >
                            -
                          </Button> */}
                          <p className={cssAccount.qty}>{item.amount}</p>
                          {/* <Button
                            variant="outline-secondary"
                            className={cssAccount.qtyButton}
                            value="item"
                            onClick={HandlerM}
                          >
                            +
                          </Button> */}
                        </td>
                        <td>배송대기</td>
                        <td>{item.amount * item.price}</td>
                        {/* <td>
                          <Button>적용</Button>
                        </td> */}
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

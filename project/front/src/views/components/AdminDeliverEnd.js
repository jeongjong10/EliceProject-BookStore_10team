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
import cssCart from "../css/Cart.module.css";
import { item } from "../../orders";

export const AdminDeliverEnd = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {item.map((item, index) => {
                  if (item.deliver === "done") {
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
                        <td>배송완료</td>
                        <td>{item.amount * item.price}</td>
                        <td>
                          <Button variant="primary" onClick={handleShow}>
                            삭제
                          </Button>

                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>삭제</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>삭제하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                취소
                              </Button>
                              <Button variant="primary">적용</Button>
                            </Modal.Footer>
                          </Modal>
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

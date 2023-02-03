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
  Dropdown,
} from "react-bootstrap";
import cssCart from "../css/Cart.module.css";
import { item } from "../../orders";

export const AdminOrderby = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const CoderEncode = (item) => {
    if (item.deliver === "ready") {
      return "배송중";
    } else if (item.deliver === "state") {
      return "배송대기";
    } else {
      return "주문취소";
    }
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

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
                  if (item.deliver === "state" || item.deliver === "ready") {
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
                          >
                            -
                          </Button>
                          <p className={cssCart.qty}>{item.amount}</p>
                          <Button
                            variant="outline-secondary"
                            className={cssCart.qtyButton}
                            value="item"
                          >
                            +
                          </Button>
                        </td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            {CoderEncode(item)}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Something else
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <td>{item.amount * item.price}</td>
                        <td>
                          <Button variant="primary" onClick={handleShow1}>
                            주문수정
                          </Button>

                          <Modal
                            show={show1}
                            onHide={handleClose1}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>주문수정</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>주문을 수정하겠습니까?</Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleClose1}
                              >
                                취소
                              </Button>
                              <Button variant="primary">적용</Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                        <td>
                          <Button variant="primary" onClick={handleShow2}>
                            주문취소
                          </Button>

                          <Modal
                            show={show2}
                            onHide={handleClose2}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>주문취소</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>주문을 취소하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleClose2}
                              >
                                아니요
                              </Button>
                              <Button variant="primary">예</Button>
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

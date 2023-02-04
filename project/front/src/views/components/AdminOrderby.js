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
import cssAdmin from "../css/Admin.module.css";
import { item } from "../../orders";

export const AdminOrderby = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();
  const CoderEncode = (item) => {
    if (item.deliver === "ready") {
      return "배송중";
    } else if (item.deliver === "state") {
      return "배송대기";
    } else if (item.deliver === "cancle") {
      return "주문취소";
    } else if (item === "ready") {
      return "배송중";
    } else if (item === "state") {
      return "배송대기";
    } else if (item === "cancel") {
      return "주문취소";
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const statusHandler = (e) => {
    console.log(e);
    console.log(e.target);
    const deliver = e.target.value;
    console.log(deliver);
    if (window.confirm("정말 수정하시겠습니까?") === false) {
      return;
    }
  };

  return (
    <>
      <Container className="subContainer">
        <Container>
          <Row>
            <Col>
              <h>총 주문수</h>
              <h2>count</h2>
            </Col>
            <Col>
              <h>배송대기중</h>
              <h2>count</h2>
            </Col>
            <Col>
              <h>배송중</h>
              <h2>count</h2>
            </Col>
          </Row>
        </Container>
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
                        <td className={cssAdmin.tdAlignLeft}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                            className={`${cssAdmin.productThumbnail}`}
                          />
                          {item.itemName}
                        </td>
                        <td>{item.orderday}</td>
                        <td>
                          {/* <Button
                            variant="outline-secondary"
                            className={cssAdmin.qtyButton}
                            value="item"
                          >
                            -
                          </Button> */}
                          <p className={cssAdmin.qty}>{item.amount}</p>
                          {/* <Button
                            variant="outline-secondary"
                            className={cssAdmin.qtyButton}
                            value="item"
                          >
                            +
                          </Button> */}
                        </td>
                        <td>
                          <select
                            value={CoderEncode(item)}
                            name="status"
                            onChange={statusHandler}
                          >
                            <option value={CoderEncode("ready")}>
                              {CoderEncode("ready")}
                            </option>
                            <option value={CoderEncode("state")}>
                              {CoderEncode("state")}
                            </option>
                            <option value={CoderEncode("cancel")}>
                              {CoderEncode("cancel")}
                            </option>
                          </select>
                        </td>
                        <td>{item.amount * item.price}</td>
                        <td>
                          <Button variant="primary" onClick={handleShow}>
                            주문취소
                          </Button>

                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>주문취소</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>주문을 취소하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
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

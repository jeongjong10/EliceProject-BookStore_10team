import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import cssAdmin from "../css/Admin.module.css";
import { customAxios } from "../../config/customAxios";
import { OrderProduct } from "./OrderProduct";

export const AdminOrderby = () => {
  const [adminOrders, setAdminOrders] = useState([]);

  async function getData() {
    return await customAxios.get("admin/orders").then((res) => {
      console.log(res.data);
      const AdminOrders = res.data.filter(
        (order) =>
          order.activate &&
          (order.status === "배송준비" ||
            order.status === "배송중" ||
            order.status === "배송완료")
      );
      console.log(AdminOrders);
      setAdminOrders(AdminOrders);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const statusHandler = async (e, index) => {
    const id = e.target.id;
    const status = e.target.value;

    if (window.confirm("정말 수정하시겠습니까?") === false) {
      return;
    }
    return await customAxios
      .patch(`admin/orders/${id}`, { status })
      .then((res) => {
        console.log(res);

        getData();
      });
  };

  const StateCount = (props) => {
    let count = 0;
    for (let orders of props) {
      if (orders.status === "배송준비") {
        count += 1;
      }
    }
    return count;
  };

  const DeliverCount = (props) => {
    let count = 0;
    for (let orders of props) {
      if (orders.status === "배송중") {
        count += 1;
      }
    }
    return count;
  };

  const EndCount = (props) => {
    let count = 0;
    for (let orders of props) {
      if (orders.status === "배송완료") {
        count += 1;
      }
    }
    return count;
  };

  const AdminModalCancel = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDataDelete = async (e) => {
      await customAxios
        .delete(`/admin/orders/${props.orderId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      handleClose();
      getData();
    };

    return (
      <>
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
            <Button variant="primary" onClick={handleDataDelete}>
              예
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Container className="subContainer">
        <Container>
          <Row>
            <Col>
              <h>총 주문수</h>
              <h2>{adminOrders.length}</h2>
            </Col>
            <Col>
              <h>배송대기중</h>
              <h2>{StateCount(adminOrders)}</h2>
            </Col>
            <Col>
              <h>배송중</h>
              <h2>{DeliverCount(adminOrders)}</h2>
            </Col>
            <Col>
              <h>배송완료</h>
              <h2>{EndCount(adminOrders)}</h2>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>상품명/수량</th>
                  <th>주문날짜</th>
                  <th>배송상태</th>
                  <th>가격</th>
                  <th>주문취소</th>
                </tr>
              </thead>
              <tbody>
                {!adminOrders.length ? (
                  <tr>
                    <td>주문내역이 존재하지 않습니다.</td>
                  </tr>
                ) : (
                  adminOrders.map((adminOrders, index) => {
                    return (
                      <tr key={index}>
                        {/* table start */}
                        <td>{adminOrders.orderNumber}</td>
                        <td className={cssAdmin.tdAlignLeft}>
                          {OrderProduct(adminOrders)}
                        </td>
                        <td>{adminOrders.createdAt.slice(0, 10)}</td>

                        <td>
                          <select
                            id={adminOrders._id}
                            value={adminOrders.status}
                            name="status"
                            onChange={(e) => statusHandler(e, index)}
                          >
                            <option value={"배송준비"}>{"배송준비"}</option>
                            <option value={"배송중"}>{"배송중"}</option>
                            <option value={"배송완료"}>{"배송완료"}</option>
                          </select>
                        </td>
                        <td>{adminOrders.totalPrice}</td>
                        <td>
                          <AdminModalCancel orderId={adminOrders._id} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

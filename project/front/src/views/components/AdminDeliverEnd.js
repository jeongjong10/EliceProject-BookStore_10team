import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import cssAdmin from "../css/Admin.module.css";

import { customAxios } from "../../config/customAxios";

export const AdminDeliverEnd = () => {
  const [adminOrders, setAdminOrders] = useState([]);

  async function getData() {
    return await customAxios.get("admin/orders").then((res) => {
      console.log(res.data);
      setAdminOrders(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const AdminOrderProduct = (adminOrders) => {
    if (adminOrders.orderList.legnth > 1) {
      return adminOrders.orderList.map(
        (orderList, index) =>
          `${adminOrders.orderList[index].productName} / ${adminOrders.orderList[index].count} 개`
      );
    } else {
      return `${adminOrders.orderList[0].productName} / ${adminOrders.orderList[0].count} 개`;
    }
  };
  const CancelCount = (props) => {
    let count = 0;
    for (let orders of props) {
      if (orders.activate === false) {
        count += 1;
      }
    }
    return count;
  };

  const AdminModalDelete = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDataDelete = async (e) => {
      await customAxios
        .delete(`/admin/falseOrders/${props.orderId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      handleShow();
      window.location.reload();
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          주문삭제
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>주문삭제</Modal.Title>
          </Modal.Header>
          <Modal.Body>주문을 삭제하시겠습니까?</Modal.Body>
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
              <h>총 주문취소 수</h>
              <h2>{CancelCount(adminOrders)}</h2>
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
                  <th>가격</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((adminOrders, index) => {
                  if (adminOrders.activate === false) {
                    return (
                      <tr key={index}>
                        {/* table start */}
                        <td>{adminOrders.orderNumber}</td>
                        <td className={cssAdmin.tdAlignLeft}>
                          {/* <img
                            src={`${process.env.PUBLIC_URL}/img/thumb1.png`}
                            className={`${cssAdmin.productThumbnail}`}
                          /> */}
                          {AdminOrderProduct(adminOrders)}
                        </td>
                        <td>{adminOrders.createdAt.slice(0, 10)}</td>
                        {/* <td>
                          <Button
                            variant="outline-secondary"
                            className={cssAdmin.qtyButton}
                            value="item"
                          >
                            -
                          </Button>
                          <p className={cssAdmin.qty}>{adminOrders.amount}</p>
                          <Button
                            variant="outline-secondary"
                            className={cssAdmin.qtyButton}
                            value="item"
                          >
                            +
                          </Button>
                        </td> */}
                        <td>{adminOrders.totalPrice}</td>
                        <td>
                          <AdminModalDelete orderId={adminOrders._id} />
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

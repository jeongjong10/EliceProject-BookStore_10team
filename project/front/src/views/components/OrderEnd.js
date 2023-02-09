import React, { useState, useEffect } from "react";

import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import cssAccount from "../css/Account.module.css";
import cssCart from "../css/Cart.module.css";
import { customAxios } from "../../config/customAxios";
import { OrderProduct } from "./OrderProduct";
export const OrderEnd = () => {
  const [orders, setOrders] = useState([]);

  // 데이터 가져오기 async function 부터 ~ useEffect까지 세트
  async function getData() {
    return await customAxios.get("/account/order").then((res) => {
      const statusOrders = res.data.filter(
        (order) => order.status === "배송완료"
      );
      setOrders(statusOrders);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  const ModalCancel = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDataDelete = async (e) => {
      await customAxios
        .delete(`/orders/${props.orderId}`)
        .then((res) => {
          handleClose();
          getData();
        })
        .catch((err) => console.log(err));
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
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>주문상품</th>
                  <th>주문날짜</th>
                  <th>배송상태</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {!orders.length ? (
                  <tr>
                    <td colSpan={6} className={cssCart.emptyCart}>
                      <h4>🤔 주문내역이 존재하지 않습니다.</h4>
                    </td>
                  </tr>
                ) : (
                  orders.map((orders, index) => {
                    return (
                      <tr key={index}>
                        <td>{orders.orderNumber}</td>
                        <td className={cssAccount.tdAlignLeft}>
                          {OrderProduct(orders)}
                        </td>
                        <td>{orders.createdAt.slice(0, 10)}</td>
                        <td>{orders.status}</td>
                        <td>{orders.totalPrice.toLocaleString("en-US")}</td>
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

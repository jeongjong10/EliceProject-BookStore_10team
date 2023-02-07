import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssCart from "../css/Cart.module.css";
import cssOrder from "../css/Order.module.css";
import { customAxios } from "../../config/customAxios";

const AdminProductRegister = () => {
  const navigate = useNavigate();

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">상품등록</h2>
      </div>
      <Row>
        <Col xs lg="2">
          <Stack gap={3}>
            <button className="order">전체 주문 관리</button>

            <button className="manager">카테고리/ 상품관리</button>
            <button className="deleted">상품등록</button>
          </Stack>
        </Col>
        <Col className={cssOrder.deliveryInfo}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>상품명</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>카테고리</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label>제조사</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>설명</Form.Label>
              <Form.Control />
            </Form.Group>
            ㅔ
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>상세 설명</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>사진</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>재고수</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>가격</Form.Label>
              <Form.Control />
            </Form.Group>
            <Button>저장</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductRegister;

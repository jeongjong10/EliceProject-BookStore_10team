import React from "react";
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
} from "react-bootstrap";
import { Orderby } from "../components/Orderby";
import { OrderEnd } from "../components/OrderEnd";

const AdminDeliver = () => {
  // const {id} = useParams()
  const navigate = useNavigate();

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Stack gap={3}>
              <button className="order">전체 주문 관리</button>
              <button className="manager">카테고리/상품 관리</button>
              <button className="deleted">상품 등록</button>
            </Stack>
          </Col>
          <Col>
            <h1>전체 주문 관리</h1>
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="orderby" title="배송중">
                <div></div>
              </Tab>

              <Tab eventKey="orderEnd" title="배송완료">
                <div></div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDeliver;

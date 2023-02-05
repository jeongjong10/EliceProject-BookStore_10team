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
import { OrderReady } from "../components/OrderReady";
import { OrderStatus } from "../components/OrderStatus";
import { OrderEnd } from "../components/OrderEnd";

const AcountOrder = () => {
  // const {id} = useParams()
  const navigate = useNavigate();

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Stack gap={3}>
              <button className="order">주문조회</button>
              <button className="manager">개인정보관리</button>
              <button className="deleted">회원탈퇴</button>
            </Stack>
          </Col>
          <Col>
            <h1>주문조회</h1>
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="orderStatus" title="배송준비">
                <div>
                  <OrderStatus />
                </div>
              </Tab>

              <Tab eventKey="orderReady" title="배송중">
                <div>
                  <OrderReady />
                </div>
              </Tab>

              <Tab eventKey="orderEnd" title="배송완료">
                <div>
                  <OrderEnd />
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AcountOrder;

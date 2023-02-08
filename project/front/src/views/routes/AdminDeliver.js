import React from "react";

import { Container, Row, Col, Stack, Tab, Tabs } from "react-bootstrap";
import { AdminDeliverEnd } from "../components/AdminDeliverEnd";
import { AdminOrderby } from "../components/AdminOrderby";

const AdminDeliver = () => {
  // const {id} = useParams()

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
              defaultActiveKey="orderby"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="orderby" title="배송">
                <div>
                  <AdminOrderby />
                </div>
              </Tab>

              <Tab eventKey="orderEnd" title="주문취소">
                <div>
                  <AdminDeliverEnd />
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDeliver;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import { AdminOrderEnd } from "../components/AdminOrderEnd";
import { AdminOrderby } from "../components/AdminOrderby";
import cssList from "../css/List.module.css";

const AdminDeliver = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Nav className="flex-column">
              <Nav.Item className={cssList.selected}>
                <a>전체 주문 관리</a>
              </Nav.Item>
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/admin/users");
                  }}
                >
                  전체 회원 관리
                </a>
              </Nav.Item>
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/admin/category");
                  }}
                >
                  카테고리/상품 관리
                </a>
              </Nav.Item>
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/admin/products");
                  }}
                >
                  상품 등록
                </a>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <h2 className={cssList.pageTitle}>전체 주문 관리</h2>
            <div style={{ marginLeft: "24px" }}>
              <Tabs
                defaultActiveKey="AdminOrderby"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="AdminOrderby" title="배송">
                  <div>
                    <AdminOrderby />
                  </div>
                </Tab>

                <Tab eventKey="AdminOrderEnd" title="주문취소">
                  <div>
                    <AdminOrderEnd />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDeliver;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import { Users } from "../components/Users";
import { FalseUsers } from "../components/FalseUsers";
import cssList from "../css/List.module.css";

const AdminUsers = () => {
  const [isSelectedTab, setIsSelectedTab] = useState(false);
  const navigate = useNavigate();

  const handleTabSelect = (activeKey) => {
    setIsSelectedTab(!isSelectedTab);
  };

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Nav className="flex-column">
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  전체 주문 관리
                </a>
              </Nav.Item>
              <Nav.Item className={cssList.selected}>
                <a>전체 회원 관리</a>
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
            <h2 className={cssList.pageTitle}>전체 회원 관리</h2>
            <div style={{ marginLeft: "24px" }}>
              <Tabs
                defaultActiveKey="Users"
                id="fill-tab-example"
                className="mb-3"
                fill
                onSelect={(activeKey) => handleTabSelect(activeKey)}
              >
                <Tab eventKey="Users" title="전체회원수">
                  <div>
                    <Users isSelected={isSelectedTab} />
                  </div>
                </Tab>

                <Tab eventKey="FalseUsers" title="비활성화계정">
                  <div>
                    <FalseUsers isSelected={isSelectedTab} />
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

export default AdminUsers;

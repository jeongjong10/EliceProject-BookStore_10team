import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Stack, Tab, Tabs } from "react-bootstrap";
import { Users } from "../components/Users";
import { FalseUsers } from "../components/FalseUsers";

const AdminUsers = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Stack gap={3}>
              <button className="order">전체 회원 관리</button>
              <button
                className="manager"
                onClick={() => {
                  navigate("/admin/category");
                }}
              >
                카테고리/상품 관리
              </button>
              <button
                className="deleted"
                onClick={() => {
                  navigate("/admin/products");
                }}
              >
                상품 등록
              </button>
            </Stack>
          </Col>
          <Col>
            <p>전체 회원 관리</p>
            <Tabs
              defaultActiveKey="Users"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="Users" title="전체회원수">
                <div>
                  <Users />
                </div>
              </Tab>

              <Tab eventKey="FalseUsers" title="비활성계정">
                <div>
                  <FalseUsers />
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminUsers;

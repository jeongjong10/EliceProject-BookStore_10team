import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import { OrderShipping } from "../components/OrderShipping";
import { OrderStatus } from "../components/OrderStatus";
import { OrderEnd } from "../components/OrderEnd";
import AccountPrivacyModal from "../components/AccountPrivacyModal";
import cssList from "../css/List.module.css";

const AcountOrder = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Nav className="flex-column">
              <Nav.Item className={cssList.selected}>
                <a>주문 조회</a>
              </Nav.Item>
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setModal(true);
                  }}
                >
                  회원정보 관리
                </a>
              </Nav.Item>
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/account/secession");
                  }}
                >
                  회원탈퇴
                </a>
              </Nav.Item>
              <AccountPrivacyModal
                show={modal}
                onHide={() => {
                  setModal(false);
                }}
              />
            </Nav>
          </Col>
          <Col>
            <h2 className={cssList.pageTitle}>주문 조회</h2>
            <div style={{ marginLeft: "24px" }}>
              <Tabs
                defaultActiveKey="OrderStatus"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="OrderStatus" title="배송준비">
                  <div>
                    <OrderStatus />
                  </div>
                </Tab>

                <Tab eventKey="OrderShipping" title="배송중">
                  <div>
                    <OrderShipping />
                  </div>
                </Tab>

                <Tab eventKey="OrderEnd" title="배송완료">
                  <div>
                    <OrderEnd />
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

export default AcountOrder;

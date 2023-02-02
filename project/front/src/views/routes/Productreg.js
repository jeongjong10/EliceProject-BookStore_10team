import React from "react";
import { Card, Container, Row, Col, ListGroup, Nav } from "react-bootstrap";

const Productreg = () => {
  return (
    <Container>
      <Row>
        <Col xs lg="2">
          <button>전체 주문 관리</button>
          <br />
          <button>카테고리/상품 관리</button>
          <br />
          <button>상품 등록</button>
          <br />
        </Col>
        <Col>
          <div>이름</div>
          <div>카테고리</div>
          <div>브랜드</div>
          <div>설명</div>
          <div>상세설명</div>
          <div>사진</div>
          <div>재고수</div>
          <div>가격</div>
          <div>검색 키워드</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Productreg;

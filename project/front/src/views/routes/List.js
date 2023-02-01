import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, ListGroup, Nav } from "react-bootstrap";

// 카테고리 이름을 params로 받아와 각 카테고리에 해당하는 상품 리스트 출력

const Detail = () => {
  // const {id} = useParams()
  const navigate = useNavigate();

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Item>
                <Nav.Link>category 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>category 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>category 3</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <h2 className="category-title">카테고리 명</h2>
            <Row>
              <Col>
                <Card onClick={() => navigate(`/product/detail`)}>
                  <div className="product-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                  </div>
                  <Card.Body>
                    <Card.Title>상품명</Card.Title>
                    <Card.Text>30,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card onClick={() => navigate(`/product/detail`)}>
                  <div className="product-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                  </div>
                  <Card.Body>
                    <Card.Title>상품명</Card.Title>
                    <Card.Text>30,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card onClick={() => navigate(`/product/detail`)}>
                  <div className="product-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                  </div>
                  <Card.Body>
                    <Card.Title>상품명</Card.Title>
                    <Card.Text>30,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card onClick={() => navigate(`/product/detail`)}>
                  <div className="product-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                  </div>
                  <Card.Body>
                    <Card.Title>상품명</Card.Title>
                    <Card.Text>30,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card onClick={() => navigate(`/product/detail`)}>
                  <div className="product-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                  </div>
                  <Card.Body>
                    <Card.Title>상품명</Card.Title>
                    <Card.Text>30,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card onClick={() => navigate(`/product/detail`)}>
                  <div className="product-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                  </div>
                  <Card.Body>
                    <Card.Title>상품명</Card.Title>
                    <Card.Text>30,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container></Container>
    </>
  );
};

export default Detail;

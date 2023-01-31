import React, { useState } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShowItemList } from "../components/ShowItemList"; // 상품 list components

const Main = () => {
  const navigate = useNavigate();

  // Carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner1.png`}
            className="main-bg"
          ></img>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner2.png`}
            className="main-bg"
          ></img>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner3.png`}
            className="main-bg"
          ></img>
        </Carousel.Item>
      </Carousel>

      <ShowItemList />
      {/* <Row>
          <Col>
            <Card onClick={() => navigate(`/product/detail`)}>
              <div className="product-thumbnail">
                <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
              </div>
              <Card.Body>
                <Card.Title>{item[0].itemName}</Card.Title>
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
        </Row> */}
    </>
  );
};

export default Main;

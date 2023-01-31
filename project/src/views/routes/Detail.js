import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

// 상품 id를 params로 받아올 예정입니다.

const Detail = () => {
  // const {id} = useParams()
  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col>
            <div className="product-thumbnail">
              <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
            </div>
          </Col>
          <Col className="product-description">
            <h2>상품명</h2>
            <h5>30,000</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laudantium tempore repellendus velit et asperiores explicabo
              soluta ab hic quaerat fugit illo voluptatem ipsam, perspiciatis
              iste ad corrupti sit quis nemo.
            </p>
            <div>
              <Form>
                <Form.Group className="mb-1">
                  <Form.Label>수량</Form.Label>
                  <Form.Control type="email" value="1" />
                </Form.Group>
              </Form>
            </div>
            <div>
              <Button>장바구니 추가</Button>
              <Button>바로 구매</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;

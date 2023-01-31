import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { item } from "../../temp"; // 상품 임시 데이터

export const ShowItemList = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        {item.map((item, index) => {
          return (
            <Col>
              <Card onClick={() => navigate(`/product/detail/${index + 1}`)}>
                <div className="product-thumbnail">
                  <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
                </div>
                <Card.Body>
                  <Card.Title>{item.itemName}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

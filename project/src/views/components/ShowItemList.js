import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ShowItemList = ({ item }) => {
  const navigate = useNavigate();
  console.log(item);
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

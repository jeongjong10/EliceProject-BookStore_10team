import { Card, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssItemList from "../css/ShowItemList.module.css";

// temp 직접 받아오지 말고 props로 받아와야 하나..
// 메인에서는 전체 데이터 / 카테고리에서는 category ..................
import { item } from "../../temp"; // 상품 임시 데이터

export const ShowItemList = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className={cssItemList.row}>
        {item.map((item, index) => {
          return (
            <Card
              onClick={() => navigate(`/product/detail/${index + 1}`)}
              className={cssItemList.card}
            >
              <div className={cssItemList.productThumbnail}>
                <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
              </div>
              <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
                <Card.Text>{item.price}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

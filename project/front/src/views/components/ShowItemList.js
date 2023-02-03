import React, { useEffect, useState } from "react";
import { Card, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssItemList from "../css/ShowItemList.module.css";
import axios from "axios";

// temp 직접 받아오지 말고 props로 받아와야 하나..
// 메인에서는 전체 데이터 / 카테고리에서는 category ..................
// import { item } from "../../temp"; // 상품 임시 데이터

export const ShowItemList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  async function getData() {
    return await axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Row className={cssItemList.row}>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              onClick={() => {
                navigate(`/products/${product._id}`);
              }}
              className={cssItemList.card}
            >
              <div className={cssItemList.productThumbnail}>
                {/* <img src={`https://picsum.photos/id/1/200/300`} /> */}
                <img src={product.img} />
              </div>
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>{product.price.toLocaleString("en-US")}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

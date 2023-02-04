import React, { useEffect, useState } from "react";
import { Card, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssItemList from "../css/ShowItemList.module.css";
import axios from "axios";

export const ShowItemList = ({ type /*, page */ }) => {
  // const pageLocation = page || '';
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(type); // 부모에서 props 바뀔 때 얘도 재랜더링 한 번 더 해주기

  async function getData() {
    return await axios
      .get("http://localhost:3001/products")
      .then((res) => {
        if (type == "ALL") {
          setProducts(res.data);
        } else {
          const categoryData = res.data.filter(
            (f) => f.categoryName == category
          );
          setProducts(categoryData);
          console.log(category);
        }
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
                <img src={product.img} />
              </div>
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>{product.price.toLocaleString("en-US")}</Card.Text>
                {/* {pageLocation == 'admin' && (
                  <button>+</button>
                )} */}
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

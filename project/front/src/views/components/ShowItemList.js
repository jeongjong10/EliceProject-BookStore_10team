import React, { useEffect, useState } from "react";
import { Card, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssItemList from "../css/ShowItemList.module.css";

export const ShowItemList = ({ data /*, page */ }) => {
  // const pageLocation = page || '';
  const navigate = useNavigate();

  return (
    <Container>
      <Row className={cssItemList.row}>
        {data.map((product, i) => {
          return (
            <Card
              key={i}
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
                <Card.Text>
                  {product.price.toLocaleString("en-US")} 원
                </Card.Text>
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

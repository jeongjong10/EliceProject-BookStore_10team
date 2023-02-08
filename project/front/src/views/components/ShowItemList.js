import React, { useEffect, useState } from "react";
import { Card, Row, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssItemList from "../css/ShowItemList.module.css";

export const ShowItemList = ({ data, page }) => {
  const pageLocation = page || "";
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
                <div className={cssItemList.textArea}>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>
                    {product.price.toLocaleString("en-US")} 원
                  </Card.Text>
                </div>
                {pageLocation == "admin" && (
                  <>
                    <Button
                      variant="outline-secondary"
                      className={cssItemList.btn}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outline-danger"
                      className={cssItemList.btn}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

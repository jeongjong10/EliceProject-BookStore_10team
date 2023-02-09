import React, { useEffect, useState } from "react";
import { Card, Row, Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../config/customAxios";
import cssItemList from "../css/ShowItemList.module.css";

export const ShowItemList = ({ data, page }) => {
  const pageLocation = page || "";
  const navigate = useNavigate();

  const [refreshData, setRefreshData] = useState([]);
  console.log("useEffect 전 ", refreshData);

  useEffect(() => {
    setRefreshData(data);
  }, [data]);

  console.log("data", data);
  console.log("useEffect 후 ", refreshData);

  async function deleteProduct(product) {
    await customAxios
      .delete(`/admin/products/${product._id}`)
      .then((res) => {
        console.log(res.data);
        // 카테고리 - selectbox에 상태 유지
        if (
          data.filter((f) => f.categoryName == product.categoryName).length > 1
        ) {
          sessionStorage.setItem("currentCategory", product.categoryName);
        } else {
          sessionStorage.removeItem("currentCategory");
        }
        // 삭제 시 처리 로직
        alert("상품이 삭제 되었습니다.");
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <Row className={cssItemList.row}>
        {refreshData.map((product, i) => {
          return (
            <Card key={i} className={cssItemList.card}>
              <div
                className={cssItemList.productThumbnail}
                onClick={() => {
                  navigate(`/products/${product._id}`);
                }}
              >
                <img src={product.img} />
              </div>
              <Card.Body>
                <div className={cssItemList.textArea}>
                  <Card.Title
                    onClick={() => {
                      navigate(`/products/${product._id}`);
                    }}
                  >
                    {product.productName}
                  </Card.Title>
                  <Card.Text>
                    {product.price.toLocaleString("en-US")} 원
                  </Card.Text>
                </div>
                {pageLocation == "admin" && (
                  <>
                    <Button
                      variant="outline-secondary"
                      className={cssItemList.btn}
                      onClick={() => {
                        navigate(`products/${product._id}`);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outline-danger"
                      className={cssItemList.btn}
                      onClick={() => {
                        deleteProduct(product);
                      }}
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

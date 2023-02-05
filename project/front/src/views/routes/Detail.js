import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

import cssDetail from "../css/Detail.module.css";
import cssItemList from "../css/ShowItemList.module.css";

const Detail = () => {
  const { id } = useParams();

  // 수량
  const [count, setCount] = useState(1);
  function getCount(e) {
    setCount(Number(e.target.value));
  }

  // 데이터 get
  const [product, setProduct] = useState({
    productName: "",
    detail: "",
    price: "",
  });

  async function getData() {
    return await axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  // 장바구니 추가
  function addCart() {
    if (!localStorage.key("cart")) {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            _id: product._id,
            count,
          },
        ])
      );
    } else {
      const currentItems = JSON.parse(localStorage.getItem("cart"));
      let currentItemsSet = new Set(currentItems);
      currentItemsSet = [...currentItemsSet]; // ? 배열 해줄 필요 없다고 하셨는데 객체 상태에서 id값 어떻게 접근하는 지 모르겠음

      // findIndex 돌면서 몇 번 째에 있는지 담김, 0부터 시작하므로 false인 -1로 처리..
      if (currentItemsSet.findIndex((f) => f._id == id) != -1) {
        alert("이미 장바구니에 있는 상품이네요!");
      } else {
        currentItemsSet.push({
          _id: id,
          count,
        });
        localStorage.setItem("cart", JSON.stringify(currentItemsSet));
      }
    }
  }

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col sm={4}>
            <div className={cssItemList.productThumbnail}>
              <img src={product.img} />
            </div>
          </Col>
          <Col sm={8} className={cssDetail.productDescription}>
            <h2>{product.productName}</h2>
            <h4>{product.price.toLocaleString("en-US")} 원</h4>

            <div className={cssDetail.infoGroup}>
              <div className={cssDetail.info}>
                <span className={cssDetail.infoTitle}>분류</span>
                <span>{product.categoryName}</span>
              </div>
              <div className={cssDetail.info}>
                <span className={cssDetail.infoTitle}>출판</span>
                <span>{product.brand}</span>
              </div>
              <div className={cssDetail.info}>
                <span className={cssDetail.infoTitle}>발행</span>
                <span>{product.detail}</span>
              </div>
            </div>
            <div>
              <Form>
                <Form.Group className={cssDetail.counting}>
                  <Form.Label>수량</Form.Label>
                  <Form.Control
                    type="number"
                    value={count}
                    onChange={getCount}
                  />
                </Form.Group>
              </Form>
            </div>
            <div>
              <Button onClick={addCart}>장바구니 추가</Button>{" "}
              <Button>바로 구매</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;

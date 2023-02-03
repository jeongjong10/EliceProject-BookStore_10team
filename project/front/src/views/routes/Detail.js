import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

import cssDetail from "../css/Detail.module.css";
import cssItemList from "../css/ShowItemList.module.css";

// import { item } from "../../temp"; // 상품 임시 데이터

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

  // ! api 구동 확인 필요 (git merge 후 확인예정)
  async function getData() {
    return await axios
      .get("http://localhost:3001/products/:_id", { productId: id })
      .then((res) => {
        setProduct(res.data[0]);
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
            itemId: id,
            count,
          },
        ])
      );
    } else {
      const currentItems = JSON.parse(localStorage.getItem("cart"));
      let currentItemsSet = new Set(currentItems);
      currentItemsSet = [...currentItemsSet]; // ? 배열 해줄 필요 없다고 하셨는데 객체 상태에서 id값 어떻게 접근하는 지 모르겠음

      // findIndex 돌면서 몇 번 째에 있는지 담김, 0부터 시작하므로 false인 -1로 처리..
      if (currentItemsSet.findIndex((f) => f.itemId == id) != -1) {
        alert("이미 장바구니에 있는 상품이네요!");
      } else {
        currentItemsSet.push({
          itemId: id,
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
          <Col>
            <div className={cssItemList.productThumbnail}>
              <img src={`${process.env.PUBLIC_URL}/img/thumb1.png`} />
            </div>
          </Col>
          <Col className={cssDetail.productDescription}>
            <h2>{product.productName}</h2>
            <h4>{product.price.toLocaleString("en-US")}</h4>
            <p>{product.detail}</p>
            <div>
              <Form>
                <Form.Group className="mb-1">
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

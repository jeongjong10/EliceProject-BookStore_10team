import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

import cssDetail from "../css/Detail.module.css";
import cssItemList from "../css/ShowItemList.module.css";

import { item } from "../../temp"; // 상품 임시 데이터

const Detail = () => {
  const { id } = useParams();
  const selected = item.find((x) => x.itemId == id);

  const [count, setCount] = useState(1);

  function getCount(e) {
    setCount(Number(e.target.value));
  }

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
      currentItemsSet = [...currentItemsSet]; // ! 배열 해줄 필요 없다고 하셨는데 객체 상태에서 id값 어떻게 접근하는 지 모르겠음

      // findIndex 돌 때 비교 조건값인 '-1' : 실제 id값은 랜덤값인데 -1로 해도 괜찮나?
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
            <h2>{selected.itemName}</h2>
            <h4>{selected.price.toLocaleString("en-US")}</h4>
            <p>{selected.note}</p>
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

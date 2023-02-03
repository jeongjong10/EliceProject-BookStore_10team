import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

import cssDetail from "../css/Detail.module.css";
import cssItemList from "../css/ShowItemList.module.css";

import { item } from "../../temp"; // 상품 임시 데이터

const Detail = () => {
  const { id } = useParams();
  const selected = item.find((x) => x.itemId == id);

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
                  <Form.Control type="count" />
                </Form.Group>
              </Form>
            </div>
            <div>
              <Button>장바구니 추가</Button> <Button>바로 구매</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;

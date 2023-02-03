import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, ListGroup, Nav } from "react-bootstrap";
import { ShowItemList } from "../components/ShowItemList"; // 상품 list components

import { item } from "../../temp"; // 상품 임시 데이터

const List = () => {
  const navigate = useNavigate();

  // 데이터에서 categoryName 뽑아서 메뉴에 담기
  let categoryList = [];
  item.map((v, i) => {
    categoryList.push(v.categoryName);
  });
  categoryList = [...new Set(categoryList)];

  // 해당 카테고리 상품 뿌리기
  const [category, setCategory] = useState(categoryList[0]);
  const [categoryItems, setCategoryItems] = useState(
    item.filter((f) => f.categoryName == category)
  );
  useEffect(() => {
    setCategoryItems(item.filter((f) => f.categoryName == category));
  }, [category]);

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Nav defaultActiveKey="/home" className="flex-column">
              {categoryList.map((v, i) => {
                return (
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        setCategory(v);
                      }}
                    >
                      {v}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col>
            {/* <h2 className="page-title">카테고리 명</h2> */}
            {/* 아이템 리스트 component */}
            {/* <ShowItemList /> */}
            {JSON.stringify(categoryItems)}
          </Col>
        </Row>
      </Container>
      <Container></Container>
    </>
  );
};

export default List;

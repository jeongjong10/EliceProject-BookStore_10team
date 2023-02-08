import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Nav, Button, Modal } from "react-bootstrap";
import { ShowItemList } from "../components/ShowItemList"; // 상품 list components
import { customAxios } from "../../config/customAxios";
import cssList from "../css/List.module.css";
import cssAdminCateg from "../css/AdminCategory.module.css";

const AdminCategory = () => {
  const navigate = useNavigate();

  const [categoryLists, setCategoryLists] = useState([]); // 전체 카테고리
  const [category, setCategory] = useState(""); // 카테고리
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  async function getData() {
    return await customAxios
      .get("/products")
      .then((res) => {
        // 데이터에서 카테고리만 빼서 list에 push
        let list = ["전체"];
        res.data.map((v, i) => {
          list.push(v.categoryName);
        });
        list = [...new Set(list)]; // 중복 제거
        setCategoryLists(list);
        setCategory(list[0]);

        setProducts(res.data);
        setSelectedProducts(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  // 선택 카테고리 상품 보여주기
  function showSelectedProducts() {
    if (category == "전체") {
      setSelectedProducts(products);
    } else {
      setSelectedProducts(products.filter((f) => f.categoryName == category));
    }
  }

  useEffect(() => {
    showSelectedProducts();
  }, [category]);

  // 카테고리 삭제 Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="subContainer">
        <Row>
          <Col xs lg="2">
            <Nav className="flex-column">
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  전체 주문 관리
                </a>
              </Nav.Item>
              <Nav.Item className={cssList.selected}>
                <a>카테고리/상품 관리</a>
              </Nav.Item>
              <Nav.Item className={cssList.unSelected}>
                <a
                  onClick={() => {
                    navigate("/admin/products");
                  }}
                >
                  상품 등록
                </a>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <h2 className={cssList.pageTitle}>카테고리/상품 관리</h2>
            <div className={cssAdminCateg.selectBox}>
              <Form.Select
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {categoryLists.map((v, i) => {
                  return (
                    <option value={v} key={i}>
                      {v}
                    </option>
                  );
                })}
              </Form.Select>
              {category != "전체" && category != "None-category" && (
                <Button variant="outline-danger" onClick={handleShow}>
                  삭제
                </Button>
              )}
            </div>
            <ShowItemList data={selectedProducts} page={"admin"} />
          </Col>
        </Row>

        {/* 카테고리 삭제 Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>카테고리 삭제</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            정말 삭제 하시겠습니까? 상품은 None-category로 이동되며,
            <br />
            카테고리 재설정이 필요합니다.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="danger" onClick={handleClose}>
              카테고리 삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AdminCategory;

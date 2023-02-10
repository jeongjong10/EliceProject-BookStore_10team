import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import cssList from "../css/List.module.css";
import { customAxios } from "../../config/customAxios";

const AdminProductRegister = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [categoryLists, setCategoryLists] = useState([]); // 전체 카테고리
  const [category, setCategory] = useState(""); // select 카테고리
  const [newCategory, setNewCategory] = useState(null); // 직접 입력 카테고리 (생성)
  const [requestCategory, setRequestCategory] = useState(""); // 서버에 보낼 카테고리명
  const [publisher, setPublisher] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  function isNum(val) {
    return !isNaN(val);
  }
  useEffect(() => {}, [isCreate]);

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
  };

  async function getData() {
    return await customAxios
      .get("/products")
      .then((res) => {
        // 데이터에서 카테고리만 빼서 list에 push
        let list = [];
        res.data.map((v, i) => {
          list.push(v.categoryName);
        });

        list = [...new Set(list)]; // 중복 제거
        setCategoryLists(list);
        setCategory(list[0]);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);
  // 서버에 보낼 카테고리 useEffect 처리
  useEffect(() => {
    if (newCategory == null) {
      setRequestCategory(category);
    } else {
      setRequestCategory(newCategory);
    }
  }, [category, newCategory]);

  const onSubmitHandeler = async (e) => {
    e.preventDefault();

    if (
      productName.length == 0 ||
      detail.length == 0 ||
      publisher.length == 0 ||
      price.length == 0 ||
      requestCategory == 0
    ) {
      return alert("값을 입력해주세요.");
    } else if (!isNum(price)) {
      return alert("올바른 가격을 입력해 주세요.");
    } else if (files === "") {
      return alert("이미지를 등록해주세요.");
    } else {
      const formdata = new FormData();
      formdata.append("productName", productName);
      formdata.append("categoryName", requestCategory);
      formdata.append("brand", publisher);
      formdata.append("detail", detail);
      formdata.append("img", files[0]);
      formdata.append("price", price);

      return await customAxios
        .post("/admin/products", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          alert("상품 등록이 완료되었습니다.");
          navigate("/admin/category");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
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
            <Nav.Item className={cssList.unSelected}>
              <a
                onClick={() => {
                  navigate("/admin/users");
                }}
              >
                전체 회원 관리
              </a>
            </Nav.Item>
            <Nav.Item className={cssList.unSelected}>
              <a
                onClick={() => {
                  navigate("/admin/category");
                }}
              >
                카테고리/상품 관리
              </a>
            </Nav.Item>
            <Nav.Item className={cssList.selected}>
              <a>상품 등록</a>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <h2 className={cssList.pageTitle}>상품 등록</h2>
          <Form style={{ marginLeft: "24px" }}>
            <Form.Group className="mb-3">
              <Form.Label>상품명</Form.Label>
              <Form.Control
                placeholder="이상한 나라의 엘리스"
                defaultValue={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>분류</Form.Label>
              <Form.Select
                className="mb-1"
                defaultValue={category}
                key={uuid()}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setNewCategory(null);
                }}
              >
                {categoryLists.map((v, i) => {
                  return (
                    <option value={v} key={i}>
                      {v}
                    </option>
                  );
                })}
                <option value="직접 입력">직접 입력</option>
              </Form.Select>
              {/* Category 직접 입력 */}
              {category == "직접 입력" && (
                <Form.Control
                  type="text"
                  placeholder="직접 입력"
                  onChange={(e) => {
                    setNewCategory(e.target.value);
                  }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>출판사</Form.Label>
              <Form.Control
                placeholder="엘리스"
                defaultValue={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>발행</Form.Label>
              <Form.Control
                placeholder="2000년 01월"
                defaultValue={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control
                placeholder="1000"
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>사진</Form.Label>
              <Form.Control
                type="file"
                id="image"
                accept="img/*"
                onChange={onLoadFile}
              />
            </Form.Group>
            <Button onClick={onSubmitHandeler}>등록</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductRegister;

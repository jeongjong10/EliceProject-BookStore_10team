import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssCart from "../css/Cart.module.css";
import cssOrder from "../css/Order.module.css";
import { customAxios } from "../../config/customAxios";

const AdminProductRegister = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(null);
  const [publisher, setPublisher] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");

  const onChangeImg = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      formdata.append("file", uploadFile);
      setFile(uploadFile);
      console.log(uploadFile);
      console.log("===useState===");
      console.log(file);
    }
  };

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    // formdata.append("productName", productName);
    // formdata.append("categoryName", selected);
    // formdata.append("brand", publisher);
    // formdata.append("detail", detail);
    // formdata.append("img", file);
    // formdata.append("price", price);
    if (
      productName.length == 0 ||
      detail.length == 0 ||
      publisher.length == 0 ||
      price.length == 0 ||
      selected == 0
    ) {
      return alert("값을 입력해주세요.");
    } else {
      return await customAxios
        .post(
          "/admin/products",
          { formdata }
          // productName: productName,
          // categoryName: selected,
          // brand: publisher,
          // detail: detail,
          // img: files,
          // price: price,
        )
        .then((response) => {
          console.log(response.data);
          alert("상품 등록이 완료되었습니다.");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
  const categories = {
    0: "",
    1: "소설",
    2: "에세이",
    3: "경제경영",
    4: "예술",
    5: "5",
  };

  return (
    <Container className="subContainer">
      <div className={cssCart.titleArea}>
        <h2 className="page-title">상품등록</h2>
      </div>
      <Row>
        <Col xs lg="2">
          <Stack gap={3}>
            <button
              className="order"
              onClick={() => {
                navigate("/admin");
              }}
            >
              전체 주문 관리
            </button>

            <button
              className="manager"
              onClick={() => {
                navigate("/admin/category");
              }}
            >
              카테고리/상품 관리
            </button>
            <button className="deleted">상품등록</button>
          </Stack>
        </Col>
        <Col className={cssOrder.deliveryInfo}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicProductname">
              <Form.Label>상품명</Form.Label>
              <Form.Control
                placeholder="이상한 나라의 엘리스"
                defaultValue={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>분류</Form.Label>
              <Form.Select
                className="mb-1"
                placeholder="분류를 선택해주세요."
                onChange={(e) => {
                  setSelected(categories[e.target.value]);
                }}
              >
                <option value="0">분류를 선택해주세요.</option>
                <option value="1">소설</option>
                <option value="2">에세이</option>
                <option value="3">경제경영</option>
                <option value="4">예술</option>
                <option value="5">직접 입력</option>
              </Form.Select>
              {/* Category 직접 입력 */}
              {selected == "5" && (
                <Form.Control
                  type="text"
                  placeholder="직접 입력"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPublisher">
              <Form.Label>출판사</Form.Label>
              <Form.Control
                placeholder="엘리스"
                defaultValue={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDetail">
              <Form.Label>발행</Form.Label>
              <Form.Control
                placeholder="2000년 01월"
                defaultValue={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>가격</Form.Label>
              <Form.Control
                placeholder="1000"
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImg">
              <Form.Label>사진</Form.Label>
              <br />
              <input
                type="file"
                id="image"
                accept="img/*"
                onChange={onChangeImg}
              />
            </Form.Group>
            <Button onClick={onSubmitHandeler}>저장</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductRegister;

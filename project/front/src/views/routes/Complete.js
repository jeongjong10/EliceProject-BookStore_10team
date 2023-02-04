import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssComplete from "../css/Complete.module.css";

import { item } from "../../temp";

const Complete = () => {
  const navigate = useNavigate();

  // * 주문 완료 후 로컬스토리지 cart clear
  return (
    <Container className="subContainer">
      <div className={cssComplete.alignCenter}>
        <h2>주문이 완료되었습니다 😊</h2>
        {/* 서버에 주문 데이터 보내고, 다시 받아오는 데이터 */}
        <h3>주문번호 : 12354123981392</h3>
        <div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              navigate("/account/orders");
            }}
          >
            주문 내역 보기
          </Button>{" "}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              navigate("/product/list");
            }}
          >
            쇼핑 계속하기
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Complete;

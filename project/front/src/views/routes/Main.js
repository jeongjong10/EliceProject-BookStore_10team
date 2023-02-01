import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShowItemList } from "../components/ShowItemList"; // 상품 list components

const Main = () => {
  const navigate = useNavigate();

  // Carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner1.png`}
            className="main-bg"
          ></img>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner2.png`}
            className="main-bg"
          ></img>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner3.png`}
            className="main-bg"
          ></img>
        </Carousel.Item>
      </Carousel>

      {/* 아이템 리스트 component */}
      <ShowItemList />
    </>
  );
};

export default Main;

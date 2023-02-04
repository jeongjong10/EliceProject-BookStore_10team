import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShowItemList } from "../components/ShowItemList"; // 상품 list components
import cssMain from "../css/Main.module.css";

const Main = () => {
  const navigate = useNavigate();

  // Carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const type = "ALL";

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className={cssMain.mainCarousel}
      >
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner1.png`}
            className={cssMain.mainBg}
          ></img>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner2.png`}
            className={cssMain.mainBg}
          ></img>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/img/banner3.png`}
            className={cssMain.mainBg}
          ></img>
        </Carousel.Item>
      </Carousel>

      {/* 아이템 리스트 component */}
      <ShowItemList type={type} />
    </>
  );
};

export default Main;

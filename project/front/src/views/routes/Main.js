import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShowItemList } from "../components/ShowItemList"; // 상품 list components
import axios from "axios";
import cssMain from "../css/Main.module.css";

const Main = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  async function getData() {
    return await axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  // Carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
      <ShowItemList data={products} />
    </>
  );
};

export default Main;

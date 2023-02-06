import React from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const address = props.address1;
  const setAddress = props.setAddress1;
  const zonecode = props.zonecode;
  const setZonecode = props.setZonecode;
  //내장함수 onCompletePost 주소 검색 후 클릭 시 저절로 닫히면서 data값들 넘어옴.
  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    console.log(data.zonecode);
    setZonecode(data.zonecode);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </div>
  );
};

export default Post;

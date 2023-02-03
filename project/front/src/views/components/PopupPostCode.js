import React from "react";
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수
  const handlePostCode = (data) => {
    let addr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      addr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    //주소 클릭 시 실행 할 명령
    //Privacy.address.value = `${addr} ${extraAddr}`;
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "43%",
    width: "600px",
    height: "400px",
    padding: "5px",
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      <button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </button>
    </div>
  );
};

export default PopupPostCode;

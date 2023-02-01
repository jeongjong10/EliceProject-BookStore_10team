import React, { useState } from "react";
import SecessionModal from "./SecessionModal";

const Secession = () => {
  const [secessionModalOn, setSecessionModalOn] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <SecessionModal
        show={secessionModalOn}
        onHide={() => {
          setSecessionModalOn(false);
        }}
      />
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h3>비밀번호</h3>
        <input />
        <div>
          <button onClick={() => setSecessionModalOn(true)}>확인</button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Secession;

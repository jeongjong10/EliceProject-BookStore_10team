import ReactDom from "react-dom";

const PopupDom = ({ children }) => {
  const a = document.getElementById("popupDom");
  return ReactDom.createPortal(children, a);
};

export default PopupDom;

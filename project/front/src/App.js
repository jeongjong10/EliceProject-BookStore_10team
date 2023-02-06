import "./views/css/App.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./views/routes/Main";
import Register from "./views/routes/Register";
import Login from "./views/routes/Login";
import Cart from "./views/routes/Cart";
import Detail from "./views/routes/Detail";
import List from "./views/routes/List";
import Registerdone from "./views/routes/Registerdone";
import AcountOrder from "./views/routes/AcountOrder";
import AcountPrivacy from "./views/routes/AcountPrivacy";
import Secession from "./views/routes/Secession";
import AdminProductRegister from "./views/routes/AdminProductRegister";
import Order from "./views/routes/Order";
import Complete from "./views/routes/Complete";
import AdminDeliver from "./views/routes/AdminDeliver";

function App() {
  const navigate = useNavigate();

  // JWT 토큰 localstorage 저장
  const JWT = localStorage.getItem("JWT");
  let isAdmin = false;
  // 임시 => JWT 해석해서 _id 에 admin = true로 임의로 해보고
  // 이 admin이 true 이면, Navbar=> admin 화면으로 변경
  if (JWT) {
    isAdmin =
      atob(JWT.split(".")[1]) === "63ddef45f5075428f51969df" ? true : false;
    isAdmin = false;
    console.log(isAdmin);
    // 이거 실제로 해보면..??
    // isAdmin = JSON.parse(atob(JWT.split(".")[1])).admin
  }

  function clearJwt() {
    localStorage.removeItem("JWT");
    alert("로그아웃 완료");
    navigate("/");
  }

  // 창 닫을 시 JWT 토큰 삭제
  // window.addEventListener(
  //   "beforeunload",
  //   function (e) {
  //     // clean localStorage here
  //     localStorage.removeItem("JWT");
  //   },
  //   false
  // );

  return (
    <div className="App">
      {/* 내비게이션 */}
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/product/list");
              }}
            >
              PRODUCT
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {JWT == null ? (
              <>
                <Nav.Link
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  회원가입
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </Nav.Link>
              </>
            ) : isAdmin ? (
              <>
                <Nav.Link
                  onClick={() => {
                    clearJwt();
                  }}
                >
                  로그아웃
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  관리자페이지
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/account/orders");
                  }}
                >
                  마이페이지
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() => {
                    clearJwt();
                  }}
                >
                  로그아웃
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/account/orders");
                  }}
                >
                  마이페이지
                </Nav.Link>
              </>
            )}

            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              CART
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 라우터 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/list" element={<List />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/registerdone" element={<Registerdone />} />
        <Route path="/account/orders" element={<AcountOrder />} />
        <Route path="/account/privacy" element={<AcountPrivacy />} />
        <Route path="/account/secession" element={<Secession />} />
        <Route path="/admin/products" element={<AdminProductRegister />} />
        <Route path="/admin" element={<AdminDeliver />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/complete" element={<Complete />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </div>
  );
}

export default App;

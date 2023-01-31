import "./App.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./views/routes/Main";
import Register from "./views/routes/Register";
import Login from "./views/routes/Login";
import Cart from "./views/routes/Cart";
import Detail from "./views/routes/Detail";
import List from "./views/routes/List";
import Registerdone from "./views/routes/Registerdone";

function App() {
  const navigate = useNavigate();

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
        <Route path="*" element={<p>404</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/list" element={<List />} />
        <Route path="/product/detail" element={<Detail />} />
        <Route path="/registerdone" element={<Registerdone />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import cssAdmin from "../css/Admin.module.css";
import { customAxios } from "../../config/customAxios";

export const Users = () => {
  const [users, setUsers] = useState([]);

  async function getData() {
    return await customAxios.get("admin/users").then((res) => {
      console.log(res.data);
      const User = res.data.filter((user) => user.activate === true);
      console.log(User);
      setUsers(User);
    });
  }

  useEffect(() => {
    getData();
    console.log(users);
  }, []);
  console.log(users);
  const statusHandler = async (e, index) => {
    const id = e.target.id;
    const admin = e.target.value;
    console.log(id);
    console.log(admin);
    if (window.confirm("정말 수정하시겠습니까?") === false) {
      return;
    }
    return await customAxios
      .patch(`admin/users/${id}`, { admin })
      .then((res) => {
        console.log(res);

        getData();
      });
  };

  const StandardUser = (props) => {
    let count = 0;
    for (let user of props) {
      if (!user.admin) {
        count += 1;
      }
    }
    return count;
  };

  const AdminUser = (props) => {
    let count = 0;
    for (let user of props) {
      if (user.admin) {
        count += 1;
      }
    }
    return count;
  };

  const FalseUser = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUserFalse = async (e) => {
      await customAxios
        .delete(`/admin/users/${props.userId}`)
        .then((res) => console.log("👩‍🦰"))
        .catch((err) => console.log(err));
      handleClose();
      getData();
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          회원 비활성화
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>회원 비활성화</Modal.Title>
          </Modal.Header>
          <Modal.Body>회원을 비활성화 하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              아니요
            </Button>
            <Button variant="primary" onClick={handleUserFalse}>
              예
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Container className="subContainer">
        <Container>
          <Row>
            <Col>
              <p>총 회원수</p>
              <p>{users.length}</p>
            </Col>
            <Col>
              <p>일반 회원수</p>
              <p>{StandardUser(users)}</p>
            </Col>
            <Col>
              <p>관리자 수</p>
              <p>{AdminUser(users)}</p>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>가입날짜</th>
                  <th>이메일</th>
                  <th>이름</th>
                  <th>권한</th>
                  <th>비활성화</th>
                </tr>
              </thead>
              <tbody>
                {!users.length ? (
                  <tr>
                    <td>회원내역이 존재하지 않습니다.</td>
                  </tr>
                ) : (
                  users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.createdAt.slice(0, 10)}</td>
                        <td className={cssAdmin.tdAlignLeft}>{user.email}</td>
                        <td>{user.userName}</td>
                        <td>
                          <select
                            id={user._id}
                            value={user.admin}
                            name="admin"
                            onChange={(e) => statusHandler(e, index)}
                          >
                            <option value={false}>{"일반회원"}</option>
                            <option value={true}>{"관리자"}</option>
                          </select>
                        </td>
                        <td>
                          <FalseUser userId={user._id} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

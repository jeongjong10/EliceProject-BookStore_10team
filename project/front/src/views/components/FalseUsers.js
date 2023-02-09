import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import cssAdmin from "../css/Admin.module.css";

import { customAxios } from "../../config/customAxios";

export const FalseUsers = () => {
  const [usersFalse, setUsersFalse] = useState([]);

  async function getData() {
    return await customAxios.get("admin/users").then((res) => {
      const FalseUser = res.data.filter((user) => user.activate === false);
      console.log(FalseUser);
      setUsersFalse(FalseUser);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const UserDelete = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDataDelete = async (e) => {
      console.log(props.userId);
      await customAxios
        .delete(`admin/falseUsers/${props.userId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      handleClose();
      getData();
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          회원삭제
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>회원삭제</Modal.Title>
          </Modal.Header>
          <Modal.Body>회원DB를 삭제하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              아니요
            </Button>
            <Button variant="primary" onClick={handleDataDelete}>
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
              <p>총 비회원 계정 수</p>
              <p>{usersFalse.length}</p>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>비활성화 일자</th>
                  <th>이메일</th>
                  <th>이름</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {!usersFalse.length ? (
                  <tr>
                    <td>비활성화 계정이 존재하지 않습니다.</td>
                  </tr>
                ) : (
                  usersFalse.map((userfalse, index) => {
                    return (
                      <tr key={index}>
                        <td>{userfalse.updatedAt.slice(0, 10)}</td>
                        <td className={cssAdmin.tdAlignLeft}>
                          {userfalse.email}
                        </td>
                        <td>{userfalse.userName}</td>
                        <td>
                          <UserDelete userId={userfalse._id} />
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

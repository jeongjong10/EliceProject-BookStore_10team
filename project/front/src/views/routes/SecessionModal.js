import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SecessionModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">회원 탈퇴</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>탈퇴하시겠습니까?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>예</Button>
        <Button onClick={onHide}>아니오</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SecessionModal;

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
export const ModalCancel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        주문취소
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>주문취소</Modal.Title>
        </Modal.Header>
        <Modal.Body>주문을 취소하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            아니요
          </Button>
          <Button variant="primary">예</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

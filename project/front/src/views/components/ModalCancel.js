import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { customAxios } from "../../config/customAxios";

export const ModalCancel = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDataDelete = async (e) => {
    await customAxios
      .delete(`/orders/${props.orderId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
        <Modal.Body>주문을 취소하시겠습니까?{props._id}</Modal.Body>
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

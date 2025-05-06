import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title = "Confirm deletion",
  bodyText,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
}) => {
  const handleConfirm = () => {
    onConfirm(); // Вызываем переданный обработчик
    toast.success(
      "This button simulates deleting information from data base!",
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyText || <p>Are you sure you want to perform this action?</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  bodyText: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.string,
};

export default ConfirmationModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title = "Подтверждение удаления",
  bodyText,
  confirmText = "Удалить",
  cancelText = "Отмена",
  variant = "danger",
}) => {
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
        {bodyText || <p>Вы уверены, что хотите выполнить это действие?</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm}>
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

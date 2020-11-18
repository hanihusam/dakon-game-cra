import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = ({
  endDialog = true,
  text,
  show,
  handleClose,
  ...props
}) => {
  const onRefreshPage = () => {
    window.location.reload(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body style={{ backgroundColor: '#9EA1DB' }}>{text}</Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#CCCCE3' }}>
        <Button variant="secondary" onClick={handleClose}>
          Tidak
        </Button>
        <Button
          variant={endDialog ? "restart" : "exit"}
          onClick={() => {
            if (!endDialog) {
              const { setWonStatus, handleResult } = props;

              setWonStatus();
              handleResult();
              handleClose();
            } else {
              onRefreshPage();
            }
          }}
        >
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  endDialog: PropTypes.bool,
  text: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ConfirmationDialog;

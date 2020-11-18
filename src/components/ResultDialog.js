import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Card } from "react-bootstrap";

import WinImg from "../img/win.png";
import LoseImg from "../img/lose.png";

const ResultDialog = ({ win, show, handleClose }) => {
  const onRefreshPage = () => {
    window.location.reload(false);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Body style={{ backgroundColor: '#F1EB9C' }}>
        <Card.Img variant="top" src={win ? WinImg : LoseImg} className="my-3" />
        <Card.Body className="text-center">
          <h1 className="text-uppercase">{win ? "BENAR" : "SALAH"}</h1>
        </Card.Body>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#F1EB9C' }}>
        <Button variant="restart" block onClick={onRefreshPage}>
          Lanjut ke Soal Berikutnya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ResultDialog.propTypes = {
  won: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ResultDialog;

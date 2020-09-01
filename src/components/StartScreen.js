import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";

const StartScreen = props => {
  const { getNumber, getType } = props;

  const [startDialog, setStartDialog] = useState(true);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    let newNum = [];
    for (let i = 1; i <= 50; i++) {
      newNum = [...newNum, i];
    }
    setNumber(newNum);
    // eslint-disable-next-line
  }, []);

  const handleStart = () => setStartDialog(prevStatus => !prevStatus);

  return (
    <Fragment>
      <Modal
        show={startDialog}
        onHide={handleStart}
        backdrop="static"
        centered={true}
      >
        <Modal.Body>
          <Container>
            <Modal.Title className="text-center">
              Silahkan pilih jenis soal
            </Modal.Title>
            <Row className="flex-column mt-3">
              <TipeSoal>FPB</TipeSoal>
              <TipeSoal>KPK</TipeSoal>
            </Row>
            <Row className="text-center mt-3">
              <Col md="12" className="text-center">
                <p>Pilih 2 bilangan sebagai acuan</p>
              </Col>
              <div className="number-board mx-auto">
                {number.map(num => (
                  <Bilangan key={num}>{num}</Bilangan>
                ))}
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-auto" variant="primary" disabled block>
            Mulai
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const SelectButton = styled.button`
  display: inline-block;
  margin: 10px;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 10px;
  border-color: #87431d;
  color: #87431d;
  background-color: transparent;
`;

const TipeSoal = styled(SelectButton)``;

const Bilangan = styled(SelectButton)`
  margin: 0 5px 5px 0;
  width: 40px;
`;

StartScreen.propTypes = {
  getNumber: PropTypes.func,
  getType: PropTypes.func
};

export default StartScreen;

import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";

const StartScreen = props => {
  const {
    open,
    getBilangan,
    getType,
    selectedType,
    selectedBilangan,
    handleStart
  } = props;

  const [number, setNumber] = useState([]);

  useEffect(() => {
    let newNum = [];
    for (let i = 2; i <= 50; i++) {
      newNum = [...newNum, i];
    }
    setNumber(newNum);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Modal show={open} onHide={handleStart} backdrop="static" centered={true}>
        <Modal.Body>
          <Container>
            <Modal.Title className="text-center">
              Silahkan pilih jenis soal
            </Modal.Title>
            <Row className="flex-column mt-3">
              {["FPB", "KPK"].map((type, idx) => {
                let selected = false;

                if (selectedType === type) {
                  selected = true;
                }

                return (
                  <TipeSoal
                    key={idx}
                    selected={selected}
                    onClick={() => getType(type)}
                  >
                    {type}
                  </TipeSoal>
                );
              })}
            </Row>
            <Row className="text-center mt-3">
              <Col md="12" className="text-center">
                <p>Pilih 2 bilangan sebagai acuan</p>
              </Col>
              <div className="number-board mx-auto">
                {number.map((num) => {
                  let selected = false;

                  if (selectedBilangan.includes(num)) {
                    selected = true;
                  }

                  return (
                    <Fragment key={num}>
                      <Bilangan
                        selected={selected}
                        onClick={() => getBilangan(num)}
                        disabled={
                          !selectedBilangan.includes(num) &&
                          selectedBilangan.length >= 2
                        }
                      >
                        {num}
                      </Bilangan>
                      {(num - 1) % 7 === 0 && <br />}
                    </Fragment>
                  );
                })}
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mx-auto"
            variant="primary"
            disabled={!(selectedBilangan.length >= 2 && selectedType.length)}
            block
            onClick={handleStart}
          >
            Mulai
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const SelectButton = styled(Button)`
  margin: 10px;
  font-size: 14px;
  border-radius: 10px;
  border-color: #87431d !important;
  color: #87431d;
  background-color: transparent;
  &:focus {
    outline: 0;
    color: #fff;
    background-color: #87431d;
  }
  &:disabled {
    &:hover {
      color: #87431d;
      background-color: initial;
    }
    color: #87431d;
    background-color: transparent;
    opacity: 0.65;
  }
`;

const TipeSoal = styled(SelectButton)`
  ${props =>
    props.selected && {
      color: "#fff",
      backgroundColor: "#87431d"
    }}
  &:focus {
    outline: 0;
    color: #fff;
    background-color: #87431d;
  }
  &:hover {
    color: #fff;
    background-color: #87431d;
  }
`;

const Bilangan = styled(SelectButton)`
  margin: 0 5px 5px 0;
  width: 40px;
  ${props =>
    props.selected && {
      color: "#fff",
      backgroundColor: "#87431d"
    }}
  &:hover {
    color: #fff;
    background-color: #87431d;
  }
  &:focus {
    outline: 0;
    ${props =>
    props.selected
      ? {
        color: "#fff",
        backgroundColor: "#87431d"
      }
      : {
        color: "#87431d",
        backgroundColor: "transparent"
      }}
  }
`;

StartScreen.propTypes = {
  getBilangan: PropTypes.func,
  getType: PropTypes.func,
  handleStart: PropTypes.func,
  open: PropTypes.bool,
  selectedType: PropTypes.string,
  selectedBilangan: PropTypes.array
};

export default StartScreen;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const NumberBoard = props => {
  const { angka } = props;

  return (
    <div className="number-board">
      <Board>{angka}</Board>
      <div className="sub">
        <i className="far fa-star"></i>
        <i className="far fa-circle"></i>
      </div>
    </div>
  );
};

const Board = styled(Button)`
  width: 64px;
  height: 64px;
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

NumberBoard.propTypes = {
  angka: PropTypes.number
};

export default NumberBoard;

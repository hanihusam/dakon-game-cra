import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const NumberBoard = props => {
  const { angka, getKelipatanPertama, getKelipatanKedua } = props;

  return (
    <div className="number-board">
      <Board>{angka}</Board>
      <div className="sub">
        <i
          className="far fa-star"
          onClick={() => getKelipatanPertama(angka)}
        ></i>
        <i
          className="far fa-circle"
          onClick={() => getKelipatanKedua(angka)}
        ></i>
      </div>
    </div>
  );
};

const Board = styled(Button)`
  width: 4em;
  height: 4em;
  border-radius: 10px;
  border-color: #87431d !important;
  color: #dbcbbd;
  background-color: #87431d;
  &:hover {
    color: #dbcbbd;
    background-color: #290001;
  }
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
  angka: PropTypes.number,
  getKelipatanPertama: PropTypes.func,
  getKelipatanKedua: PropTypes.func
};

export default NumberBoard;

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const NumberBoard = props => {
  const {
    angka,
    selected,
    getKelipatanPertama,
    getKelipatanKedua,
    getBothSelected
  } = props;

  const [starSelected, setStarSelected] = useState(false);
  const [dotSelected, setDotSelected] = useState(false);

  return (
    <TheNumberBoard>
      <Board selected={selected} onClick={() => getBothSelected(angka)}>
        {angka}
      </Board>
      <div className="sub-board">
        <i
          className={`${starSelected ? "fas" : "far"} fa-star`}
          onClick={() => {
            getKelipatanPertama(angka);
            setStarSelected(prevStatus => !prevStatus);
          }}
        ></i>
        <i
          className={`${dotSelected ? "fas" : "far"} fa-circle`}
          onClick={() => {
            getKelipatanKedua(angka);
            setDotSelected(prevStatus => !prevStatus);
          }}
        ></i>
      </div>
    </TheNumberBoard>
  );
};

const Board = styled(Button)`
  width: 4em;
  height: 4em;
  border-radius: 10px;
  border-color: #87431d !important;
  color: #dbcbbd;
  background-color: ${props => (props.selected ? "#290001" : "#87431d")};
  &:hover {
    color: #dbcbbd;
    background-color: #290001;
  }
  &:focus {
    outline: 0;
    color: #dbcbbd;
    background-color: ${props => (props.selected ? "#290001" : "#87431d")};
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

const TheNumberBoard = styled.div`
  margin: 10px 20px;
  width: 64px;
  height: 64px;
  display: inline-block;
  .sub-board {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    > i {
      font-size: 12px;
      cursor: pointer;
    }
  }
`;

NumberBoard.propTypes = {
  angka: PropTypes.number,
  getKelipatanPertama: PropTypes.func,
  getKelipatanKedua: PropTypes.func
};

export default NumberBoard;

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const NumberBoard = props => {
  const {
    angka,
    selected,
    getFaktorPertama,
    getFaktorKedua,
    getJawaban
  } = props;

  const [starSelected, setStarSelected] = useState(false);
  const [dotSelected, setDotSelected] = useState(false);

  return (
    <TheNumberBoard>
      <Board selected={selected} onClick={() => getJawaban(angka)}>
        {angka}
      </Board>
      <div className="sub-board">
        <TriangleUp
          selected={dotSelected}
          onClick={() => {
            getFaktorPertama(angka);
            setDotSelected(prevStatus => !prevStatus);
          }}
        />
        <Diamond
          selected={starSelected}
          onClick={() => {
            getFaktorKedua(angka);
            setStarSelected(prevStatus => !prevStatus);
          }}
        />
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

export const TriangleUp = styled.i`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid ${props => props.selected ? 'coral' : 'orange'};
`

export const Diamond = styled.i`
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: ${props => props.selected ? 'coral' : 'orange'};
  position: relative;
  top: -9px;

  ::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: ${props => props.selected ? 'coral' : 'orange'};
  }
`

NumberBoard.propTypes = {
  angka: PropTypes.number,
  getFaktorPertama: PropTypes.func,
  getFaktorKedua: PropTypes.func
};

export default NumberBoard;

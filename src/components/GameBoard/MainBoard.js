import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Row } from "react-bootstrap";

import NumberBoard from "./NumberBoard";

const MainBoard = props => {
  const { tipe, bilangan } = props;

  const [daftarAngka, setDaftarAngka] = useState([]);
  const [kelipatanPertama, setKelipatanPertama] = useState([]);
  const [kelipatanKedua, setKelipatanKedua] = useState([]);

  useEffect(() => {
    let newAngka = [];
    for (let i = 1; i <= 100; i++) {
      newAngka = [...newAngka, i];
    }
    setDaftarAngka(newAngka);
    // eslint-disable-next-line
  }, []);

  const getKelipatanPertama = value => {
    const position = kelipatanPertama.indexOf(value);
    let newBilangan = kelipatanPertama.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...kelipatanPertama, value];
    }

    setKelipatanPertama(newBilangan);
  };

  const getKelipatanKedua = value => {
    const position = kelipatanKedua.indexOf(value);
    let newBilangan = kelipatanKedua.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...kelipatanKedua, value];
    }

    setKelipatanKedua(newBilangan);
  };

  return (
    <BoardArea>
      <h1 className="text-center">{`"Tentukan ${tipe} dari bilangan ${bilangan[0]} dan ${bilangan[1]}"`}</h1>
      <Subtitle>
        <p className="text-info">
          Tanda <i className="far fa-circle" /> untuk kelipatan bilangan{" "}
          {bilangan[0]}
        </p>
        <span>|</span>
        <p className="text-info">
          Tanda <i className="far fa-star" /> untuk kelipatan bilangan{" "}
          {bilangan[1]}
        </p>
      </Subtitle>
      <ControlButton>
        <Button variant="primary">Selesai</Button>
        <Button variant="danger" className="mt-2">
          Keluar
        </Button>
      </ControlButton>
      <GameBoard>
        {daftarAngka.map(angka => (
          <NumberBoard
            getKelipatanPertama={getKelipatanPertama}
            getKelipatanKedua={getKelipatanKedua}
            key={angka}
            angka={angka}
          />
        ))}
      </GameBoard>
    </BoardArea>
  );
};

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
`;

const GameBoard = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const Subtitle = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: space-around;
  margin-right: auto;
  margin-left: auto;
`;

const ControlButton = styled(Row)`
  width: 50%;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
`;

export default MainBoard;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formula } from "../../lib/formula";
import { Button, Row, Col } from "react-bootstrap";

import NumberBoard from "./NumberBoard";

const MainBoard = props => {
  const { tipe, bilangan } = props;

  const [daftarAngka, setDaftarAngka] = useState([]);
  const [kelipatanPertama, setKelipatanPertama] = useState({
    jawaban: [],
    kunci: []
  });
  const [kelipatanKedua, setKelipatanKedua] = useState({
    jawaban: [],
    kunci: []
  });
  const [bothSelected, setBothSelected] = useState({ jawaban: [], kunci: [] });
  const [nilaiHasil, setNilaiHasil] = useState({ jawaban: 0, kunci: 0 });

  useEffect(() => {
    let newAngka = [];
    for (let i = 1; i <= 100; i++) {
      newAngka = [...newAngka, i];
    }
    setDaftarAngka(newAngka);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getKunciKelipatan();
    // eslint-disable-next-line
  }, [daftarAngka]);

  useEffect(() => {
    if (kelipatanPertama.kunci.length > 0 && kelipatanKedua.kunci.length > 0) {
      getKunciBothSelected();
    }
    // eslint-disable-next-line
  }, [kelipatanPertama.kunci, kelipatanKedua.kunci]);

  useEffect(() => {
    if (bothSelected.kunci.length > 0) {
      setNilaiHasil(prevState => ({ ...prevState, kunci: getHasil() }));
    }
    // eslint-disable-next-line
  }, [bothSelected.kunci]);

  const getKelipatanPertama = value => {
    const position = kelipatanPertama.jawaban.indexOf(value);
    let newBilangan = kelipatanPertama.jawaban.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...kelipatanPertama.jawaban, value];
    }

    setKelipatanPertama({ ...kelipatanPertama, jawaban: newBilangan });
  };

  const getKunciKelipatan = () => {
    let newBilanganPertama = [];
    let newBilanganKedua = [];

    if (daftarAngka.length > 1) {
      for (let i = bilangan[0]; i <= daftarAngka.length; i++) {
        if (i % bilangan[0] === 0) {
          newBilanganPertama = [...newBilanganPertama, i];
        }
        if (i % bilangan[1] === 0) {
          newBilanganKedua = [...newBilanganKedua, i];
        }
      }

      setKelipatanPertama(prevState => ({
        ...prevState,
        kunci: newBilanganPertama
      }));
      setKelipatanKedua(prevState => ({
        ...prevState,
        kunci: newBilanganKedua
      }));
    }
  };

  const getKelipatanKedua = value => {
    const position = kelipatanKedua.jawaban.indexOf(value);
    let newBilangan = kelipatanKedua.jawaban.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...kelipatanKedua.jawaban, value];
    }

    setKelipatanKedua({ ...kelipatanKedua, jawaban: newBilangan });
  };

  const getBothSelected = value => {
    const position = bothSelected.jawaban.indexOf(value);
    let newBilangan = bothSelected.jawaban.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...bothSelected.jawaban, value];
    }

    setBothSelected({ ...bothSelected, jawaban: newBilangan });
  };

  const getKunciBothSelected = () => {
    let newBilangan = kelipatanPertama.kunci.filter(bil =>
      kelipatanKedua.kunci.includes(bil)
    );

    setBothSelected(prevState => ({ ...prevState, kunci: newBilangan }));
  };

  const getHasil = (bilangan = bothSelected.kunci) => {
    const hasil = formula(bilangan, tipe);
    return hasil;
  };

  return (
    <BoardArea>
      <Col md="8" className="mx-auto">
        <h1 className="text-center">{`"Tentukan ${tipe} dari pertemuan bilangan kelipatan ${bilangan[0]} dan ${bilangan[1]}"`}</h1>
      </Col>
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
        <Button
          variant="primary"
          onClick={() =>
            setNilaiHasil(prevState => ({
              ...prevState,
              jawaban: getHasil(bothSelected.jawaban)
            }))
          }
        >
          Selesai
        </Button>
        <Button variant="danger" className="mt-2">
          Keluar
        </Button>
      </ControlButton>
      <GameBoard>
        {daftarAngka.map(angka => {
          let selected = false;

          if (bothSelected.jawaban.includes(angka)) {
            selected = true;
          }
          return (
            <NumberBoard
              getKelipatanPertama={getKelipatanPertama}
              getKelipatanKedua={getKelipatanKedua}
              getBothSelected={getBothSelected}
              key={angka}
              angka={angka}
              selected={selected}
            />
          );
        })}
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

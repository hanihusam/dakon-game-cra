import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Row, Col } from "react-bootstrap";

import NumberBoard from "./NumberBoard";
import ConfirmationDialog from "../ConfirmationDialog";
import ResultDialog from "../ResultDialog";
import { formula } from "../../lib/formula";

const arrayEquals = (arrA, arrB) => {
  return (
    Array.isArray(arrA) &&
    Array.isArray(arrB) &&
    arrA.length === arrB.length &&
    arrA.every((val, index) => val === arrB[index])
  );
};

const MainBoard = ({ tipe, bilangan }) => {
  const [won, setWon] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [daftarAngka, setDaftarAngka] = useState([]);
  const [faktorPertama, setFaktorPertama] = useState({
    jawaban: [],
    kunci: []
  });
  const [faktorKedua, setFaktorKedua] = useState({
    jawaban: [],
    kunci: []
  });
  const [nilaiFPB, setNilaiFPB] = useState(null);
  const [nilaiKPK, setNilaiKPK] = useState(null);
  const [nilaiHasil, setNilaiHasil] = useState(null);
  const [openDialog, setOpenDialog] = useState({
    show: false,
    text: "",
    endDialog: true
  });

  useEffect(() => {
    let newAngka = [];
    for (let i = 1; i <= 100; i++) {
      newAngka = [...newAngka, i];
    }
    setDaftarAngka(newAngka);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getKunciFaktor();
    // eslint-disable-next-line
  }, [daftarAngka]);

  useEffect(() => {
    if (faktorPertama.kunci.length > 0 && faktorKedua.kunci.length > 0) {
      if (tipe === "FPB") {
        getKunciFPB();
      } else getKunciKPK();
    }
    // eslint-disable-next-line
  }, [faktorPertama.kunci, faktorKedua.kunci]);

  const getFaktorPertama = value => {
    const position = faktorPertama.jawaban.indexOf(value);
    let newBilangan = faktorPertama.jawaban.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...faktorPertama.jawaban, value];
    }

    setFaktorPertama({ ...faktorPertama, jawaban: newBilangan });
  };

  const getKunciFaktor = () => {
    let newBilanganPertama = [];
    let newBilanganKedua = [];

    if (daftarAngka.length > 1) {
      for (let i = 1; i <= bilangan[0]; i++) {
        if (bilangan[0] % i === 0) {
          newBilanganPertama = [...newBilanganPertama, i];
        }
      }
      for (let i = 1; i <= bilangan[1]; i++) {
        if (bilangan[1] % i === 0) {
          newBilanganKedua = [...newBilanganKedua, i];
        }
      }

      setFaktorPertama(prevState => ({
        ...prevState,
        kunci: newBilanganPertama
      }));
      setFaktorKedua(prevState => ({
        ...prevState,
        kunci: newBilanganKedua
      }));
    }
  };

  const getFaktorKedua = value => {
    const position = faktorKedua.jawaban.indexOf(value);
    let newBilangan = faktorKedua.jawaban.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...faktorKedua.jawaban, value];
    }

    setFaktorKedua({ ...faktorKedua, jawaban: newBilangan });
  };

  const getJawaban = value => {
    if (nilaiHasil === value) {
      setNilaiHasil(null);
    } else setNilaiHasil(value);
  };

  const getKunciFPB = () => {
    let newBilangan = faktorPertama.kunci.filter(bil =>
      faktorKedua.kunci.includes(bil)
    );
    let nilai =
      newBilangan.length === 0 ? 0 : Math.max.apply(Math, newBilangan);

    setNilaiFPB(nilai);
  };

  const getKunciKPK = () => {
    let newBilangan = [...faktorPertama.kunci, ...faktorKedua.kunci];
    let nilai = formula(newBilangan, "KPK");

    setNilaiKPK(nilai);
  };

  const onFinishGame = () => {
    setOpenDialog(prevState => ({
      show: !prevState.show,
      text: "Apakah Anda sudah yakin dengan jawaban Anda?",
      endDialog: false
    }));
  };

  const onEndGame = () => {
    setOpenDialog(prevState => ({
      show: !prevState.show,
      text: "Apakah Anda yakin ingin mengakhiri permainan?",
      endDialog: true
    }));
  };

  const getWonStatus = () => {
    if (
      arrayEquals(faktorPertama.kunci, faktorPertama.jawaban) &&
      arrayEquals(faktorKedua.kunci, faktorKedua.jawaban)
    ) {
      if (tipe === "FPB") {
        if (nilaiHasil === nilaiFPB) setWon(true);
      } else {
        if (nilaiHasil === nilaiKPK) setWon(true);
      }
    }
  };

  return (
    <>
      <BoardArea>
        <Col md="8" className="mx-auto">
          <h1 className="text-center">{`Tentukan ${tipe} dari ${bilangan[0]} dan ${bilangan[1]}`}</h1>
        </Col>
        <Subtitle>
          <p style={{ fontSize: '20px', color: '#F56600' }}>
            Tanda segitiga untuk faktor bilangan{" "}
            {bilangan[0]}
          </p>
          <span>|</span>
          <p style={{ fontSize: '20px', color: '#F56600' }}>
            Tanda belah ketupat untuk faktor bilangan{" "}
            {bilangan[1]}
          </p>
        </Subtitle>
        <GameBoard>
          {daftarAngka.map(angka => {
            let selected = false;

            if (nilaiHasil === angka) {
              selected = true;
            }
            return (
              <NumberBoard
                getFaktorPertama={getFaktorPertama}
                getFaktorKedua={getFaktorKedua}
                getJawaban={getJawaban}
                key={angka}
                angka={angka}
                selected={selected}
              />
            );
          })}
        </GameBoard>
        <ControlButton>
          <Col className="text-right">
            <Button
              className='mr-2 text-white'
              variant="restart"
              onClick={onFinishGame}
              disabled={!nilaiHasil}
            >
              Selesai
          </Button>
            <Button className="text-white" variant="exit" onClick={onEndGame}>
              Keluar
          </Button>
          </Col>
        </ControlButton>
      </BoardArea>
      <ConfirmationDialog
        show={openDialog.show}
        endDialog={openDialog.endDialog}
        text={openDialog.text}
        setWonStatus={getWonStatus}
        handleResult={() => setResultOpen(prevState => !prevState)}
        handleClose={() =>
          setOpenDialog(prevState => ({ ...prevState, show: !prevState.show }))
        }
      />
      <ResultDialog
        win={won}
        show={resultOpen}
        handleClose={() => setResultOpen(prevState => !prevState)}
      />
    </>
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
  width: 80%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
`;

const ControlButton = styled(Row)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
`;

export default MainBoard;

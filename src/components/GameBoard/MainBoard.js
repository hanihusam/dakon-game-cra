import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formula } from "../../lib/formula";
import { Button, Row, Col } from "react-bootstrap";

import NumberBoard from "./NumberBoard";
import ConfirmationDialog from "../ConfirmationDialog";
import ResultDialog from "../ResultDialog";

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
  const [bothSelected, setBothSelected] = useState({ jawaban: [], kunci: [] });
  const [nilaiHasil, setNilaiHasil] = useState({ jawaban: 0, kunci: 0 });
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
      getKunciBothSelected();
    }
    // eslint-disable-next-line
  }, [faktorPertama.kunci, faktorKedua.kunci]);

  useEffect(() => {
    if (bothSelected.kunci.length > 0) {
      setNilaiHasil(prevState => ({ ...prevState, kunci: getHasil() }));
    }
    // eslint-disable-next-line
  }, [bothSelected.kunci]);

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
      for (let i = 1; i <= daftarAngka.length; i++) {
        if (i % bilangan[0] === 0 || bilangan[0] % i === 0) {
          newBilanganPertama = [...newBilanganPertama, i];
        }
        if (i % bilangan[1] === 0 || bilangan[1] % i === 0) {
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
    let newBilangan = faktorPertama.kunci.filter(bil =>
      faktorKedua.kunci.includes(bil)
    );

    setBothSelected(prevState => ({ ...prevState, kunci: newBilangan }));
  };

  const getHasil = (bilangan = bothSelected.kunci) => {
    const hasil = formula(bilangan, tipe);
    return hasil;
  };

  const onFinishGame = () => {
    setNilaiHasil(prevState => ({
      ...prevState,
      jawaban: getHasil(bothSelected.jawaban)
    }));

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
    const { jawaban, kunci } = nilaiHasil;
    if (jawaban === kunci) {
      setWon(prevState => !prevState);
    }
  };

  return (
    <>
      <BoardArea>
        <Col md="8" className="mx-auto">
          <h1 className="text-center">{`"Tentukan ${tipe} dari pertemuan bilangan faktor dari ${bilangan[0]} dan ${bilangan[1]}"`}</h1>
        </Col>
        <Subtitle>
          <p className="text-info">
            Tanda <i className="far fa-circle" /> untuk faktor bilangan{" "}
            {bilangan[0]}
          </p>
          <span>|</span>
          <p className="text-info">
            Tanda <i className="far fa-star" /> untuk faktor bilangan{" "}
            {bilangan[1]}
          </p>
        </Subtitle>
        <ControlButton>
          <Button
            variant="primary"
            onClick={onFinishGame}
            disabled={bothSelected.jawaban.length === 0}
          >
            Selesai
          </Button>
          <Button variant="danger" className="mt-2" onClick={onEndGame}>
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
                getFaktorPertama={getFaktorPertama}
                getFaktorKedua={getFaktorKedua}
                getBothSelected={getBothSelected}
                key={angka}
                angka={angka}
                selected={selected}
              />
            );
          })}
        </GameBoard>
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
  width: 50%;
  height: auto;
  display: flex;
  justify-content: space-between;
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

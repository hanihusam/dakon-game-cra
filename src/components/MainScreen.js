import React, { useState } from "react";
import { Container } from "react-bootstrap";

import StartScreen from "./StartScreen";
import MainBoard from "./GameBoard/MainBoard";

const MainScreen = () => {
  const [tipeSoal, setTipeSoal] = useState("");
  const [bilangan, setBilangan] = useState([]);
  const [startDialog, setStartDialog] = useState(true);

  const getType = value => setTipeSoal(value);

  const getBilangan = value => {
    const position = bilangan.indexOf(value);
    let newBilangan = bilangan.slice();

    if (position !== -1) {
      newBilangan.splice(position, 1);
    } else {
      newBilangan = [...bilangan, value];
    }

    setBilangan(newBilangan);
  };

  const handleStart = () => setStartDialog(prevStatus => !prevStatus);

  return (
    <main className="h-app">
      <Container>
        <StartScreen
          open={startDialog}
          handleStart={handleStart}
          getBilangan={getBilangan}
          getType={getType}
          selectedType={tipeSoal}
          selectedBilangan={bilangan}
        />
        <div id="title" className="text-center">
          <div className="display-4">Game Dakon</div>
          <p className="text-muted">Menggunakan Konsep FPB / KPK</p>
        </div>
        {!startDialog && (
          <MainBoard
            tipe={tipeSoal}
            bilangan={bilangan.sort((a, b) => a - b)}
          />
        )}
      </Container>
    </main>
  );
};

export default MainScreen;

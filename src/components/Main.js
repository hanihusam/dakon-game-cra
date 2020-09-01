import React, { useState } from "react";
import { Container } from "react-bootstrap";

import StartScreen from "./StartScreen";

const Main = () => {
  const [tipeSoal, setTipeSoal] = useState("");
  const [bilangan, setBilangan] = useState([]);

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

  return (
    <main className="h-app">
      <Container>
        <StartScreen
          getBilangan={getBilangan}
          getType={getType}
          selectedType={tipeSoal}
          selectedBilangan={bilangan}
        />
        <div id="title" className="text-center">
          <div className="display-4">Game Dakon</div>
          <p className="text-muted">Menggunakan Konsep FPB / KPK</p>
        </div>
      </Container>
    </main>
  );
};

export default Main;

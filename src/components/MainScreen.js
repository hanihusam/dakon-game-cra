import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import StartScreen from "./StartScreen";
import MainBoard from "./GameBoard/MainBoard";
import RuleDialog from "./RuleDialog";

const MainScreen = () => {
  const [tipeSoal, setTipeSoal] = useState("");
  const [bilangan, setBilangan] = useState([]);
  const [startDialog, setStartDialog] = useState(false);
  const [ruleDialog, setRuleDialog] = useState(true);

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

  const handleStart = () => setStartDialog(null);
  const handleRule = () => {
    setRuleDialog(prevStatus => !prevStatus);
    if (startDialog !== null) {
      setStartDialog(prevStatus => !prevStatus)
    }
  }

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
          <div className="display-4" style={{ color: '#EB2629', fontWeight: 700 }}>Game Pamusi</div>
        </div>
        {/* <div className="text-left">
          <Button size='sm' variant='warning' onClick={() => setRuleDialog(prevStatus => !prevStatus)}>Peraturan</Button>
        </div> */}
        {!ruleDialog && !startDialog && (
          <MainBoard
            tipe={tipeSoal}
            bilangan={bilangan.sort((a, b) => a - b)}
          />
        )}
      </Container>
      <RuleDialog open={ruleDialog} handleStart={handleRule} />
    </main>
  );
};

export default MainScreen;

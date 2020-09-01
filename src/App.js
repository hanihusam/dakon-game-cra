import React, { useState } from "react";
import StartScreen from "./components/StartScreen";

const App = () => {
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
      <StartScreen
        getBilangan={getBilangan}
        getType={getType}
        selectedType={tipeSoal}
        selectedBilangan={bilangan}
      />
    </main>
  );
};

export default App;

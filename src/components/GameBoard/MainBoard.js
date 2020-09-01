import React, { useState, useEffect } from "react";
import NumberBoard from "./NumberBoard";

const MainBoard = props => {
  const { tipe, bilangan } = props;

  const [daftarAngka, setDaftarAngka] = useState([]);

  useEffect(() => {
    let newAngka = [];
    for (let i = 1; i <= 100; i++) {
      newAngka = [...newAngka, i];
    }
    setDaftarAngka(newAngka);
    // eslint-disable-next-line
  }, []);

  return (
    <div id="game-board">
      <h1 className="text-center">{`"Tentukan ${tipe} dari bilangan ${bilangan[0]} dan ${bilangan[1]}"`}</h1>
      <div id="board" className="mt-5 text-center">
        {daftarAngka.map(angka => (
          <NumberBoard key={angka} angka={angka} />
        ))}
      </div>
    </div>
  );
};

export default MainBoard;

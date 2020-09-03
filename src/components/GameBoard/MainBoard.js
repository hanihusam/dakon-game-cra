import React, { useState, useEffect } from "react";
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
    <div id="game-board">
      <h1 className="text-center">{`"Tentukan ${tipe} dari bilangan ${bilangan[0]} dan ${bilangan[1]}"`}</h1>
      <div className="subtitle mx-auto">
        <p className="text-info">
          Tanda <i className="far fa-circle" /> untuk kelipatan bilangan{" "}
          {bilangan[0]}
        </p>
        <span>|</span>
        <p className="text-info">
          Tanda <i className="far fa-star" /> untuk kelipatan bilangan{" "}
          {bilangan[1]}
        </p>
      </div>
      <div id="board" className="mt-5 text-center">
        {daftarAngka.map(angka => (
          <NumberBoard
            getKelipatanPertama={getKelipatanPertama}
            getKelipatanKedua={getKelipatanKedua}
            key={angka}
            angka={angka}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBoard;

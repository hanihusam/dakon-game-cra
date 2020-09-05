function Angka(val) {
  this.value = val;
  this.number = [];
  this.pangkat = [];

  let prime = 2;
  let j = 0;

  const nextPrime = a => {
    let ketemu = false;
    let i = a + 1;
    while (!ketemu) {
      ketemu = true;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          ketemu = false;
          break;
        }
      }
      if (ketemu) return i;
      i++;
    }
  };

  while (val >= 2) {
    if (val % prime === 0) {
      val /= prime;
      if (j === 0 || (j > 0 && this.number[j - 1] !== prime)) {
        this.number[j] = prime;
        this.pangkat[j] = 1;
        j++;
      } else {
        this.pangkat[j - 1]++;
      }
    } else {
      prime = nextPrime(prime);
    }
  }
}

export const formula = (value, tipe) => {
  let Bilangan = [];

  for (let i = 0; i < value.length; i++) {
    Bilangan[i] = new Angka(value[i]);
  }

  let maxjum = 0;
  let idmax = 0;
  for (let i = 0; i < Bilangan.length; i++) {
    if (Bilangan[i].number.length > maxjum) {
      maxjum = Bilangan[i].number.length;
      idmax = i;
    }
  }

  switch (tipe) {
    case "KPK":
      let nilaiKPK = [];
      let hasilKPK = 1;

      for (let i = 0; i < Bilangan.length; i++) {
        for (let j = 0; j < Bilangan[i].number.length; j++) {
          let ada = false;
          for (let k = 0; k < nilaiKPK.length / 2; k++) {
            if (nilaiKPK[2 * k + 0] === Bilangan[i].number[j]) {
              ada = true;
              if (Bilangan[i].pangkat[j] > nilaiKPK[2 * k + 1])
                nilaiKPK[2 * k + 1] = Bilangan[i].pangkat[j];
              break;
            }
          }
          if (!ada) {
            nilaiKPK[nilaiKPK.length] = Bilangan[i].number[j];
            nilaiKPK[nilaiKPK.length] = Bilangan[i].pangkat[j];
          }
        }
      }

      for (let i = 0; i < nilaiKPK.length / 2; i++) {
        hasilKPK *= Math.pow(nilaiKPK[2 * i + 0], nilaiKPK[2 * i + 1]);
      }

      return hasilKPK;
    case "FPB":
      let nilaiFPB = [];
      let hasilFPB = 1;

      for (let j = 0; j < Bilangan[idmax].number.length; j++) {
        let jum = 1,
          p = Bilangan[idmax].pangkat[j];
        for (let i = 0; i < Bilangan.length; i++) {
          if (idmax !== i) {
            for (let k = 0; k < Bilangan[i].number.length; k++)
              if (Bilangan[idmax].number[j] === Bilangan[i].number[k]) {
                if (Bilangan[i].pangkat[j] < p) p = Bilangan[i].pangkat[j];
                jum++;
                break;
              }
          }
        }
        if (jum === Bilangan.length) {
          nilaiFPB[nilaiFPB.length] = Bilangan[idmax].number[j];
          nilaiFPB[nilaiFPB.length] = p;
        }
      }

      for (let i = 0; i < nilaiFPB.length / 2; i++) {
        hasilFPB *= Math.pow(nilaiFPB[2 * i + 0], nilaiFPB[2 * i + 1]);
      }

      return hasilFPB;
    default:
      return 0;
  }
};

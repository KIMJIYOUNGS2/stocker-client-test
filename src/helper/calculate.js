import React from "react";

function calculate(totalResult) {
  let raw = "";
  const calculation = { e: 0, i: 0, s: 0, n: 0, t: 0, p: 0, j: 0, t: 0 };

  totalResult[0] == "1" ? (calculation.p += 1) : (calculation.j += 1);
  totalResult[1] == "1" ? (calculation.j += 1) : (calculation.p += 1);
  //   totalResult[2] == "1" ? (calculation.p += 1) : (calculation.j += 1);
  totalResult[3] == "1" ? (calculation.e += 1) : (calculation.i += 1);
  totalResult[4] == "1" ? (calculation.t += 1) : (calculation.f += 1);
  totalResult[5] == "1" ? (calculation.n += 1) : (calculation.s += 1);
  //   totalResult[6] == "1" ? (calculation.j += 1) : (calculation.p += 1);
  totalResult[7] == "1" ? (calculation.j += 1) : (calculation.p += 1);
  totalResult[8] == "1" ? (calculation.n += 1) : (calculation.s += 1);
  // console.log(calculation);

  calculation.e > calculation.i ? (raw += "e") : (raw += "i");
  calculation.n >= calculation.s ? (raw += "n") : (raw += "s");
  calculation.f > calculation.t ? (raw += "f") : (raw += "t");
  calculation.j > calculation.p ? (raw += "j") : (raw += "p");

  // console.log(raw);
  sessionStorage.setItem("mbti", raw);

  return raw;
}

export default calculate;

import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const CRT_WIDTH = 40;
const CRT_HEIGHT = 6;
const NO_OP = "noop";

const crt = Array(CRT_HEIGHT)
  .fill(0)
  .map(() => Array(CRT_WIDTH).fill(" "));

const solve = () => {
  let x = 1;
  let cycleCount = 0;
  let crtX = 0;
  let crtY = 0;

  const incrementCrt = () => {
    checkSprite();
    crtX++;
    if (crtX === CRT_WIDTH) {
      crtY++;
      crtX = 0;
    }
    if (crtY === CRT_HEIGHT) {
      crtY = 0;
    }
  };

  const checkSprite = () => {
    if (x - 1 === crtX || x === crtX || x + 1 === crtX) {
      crt[crtY][crtX] = "#";
    }
  };

  data.forEach((instruction) => {
    cycleCount++;
    incrementCrt();
    if (instruction === NO_OP) return;
    cycleCount++;
    incrementCrt();
    const [, value] = instruction.split(" ");
    x = x + Number(value);
  });
  return crt.map((row) => row.join("")).join("\n");
};

console.log(solve());

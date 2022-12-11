import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const NO_OP = "noop";

const getSignalStrength = (cycleCount: number, x: number) =>
  cycleCount === 20 || (cycleCount - 20) % 40 === 0 ? cycleCount * x : 0;

const solve = () => {
  let x = 1;
  let cycleCount = 0;
  let signalStrengthSum = 0;

  const tickCycles = () => {
    cycleCount++;
    signalStrengthSum = signalStrengthSum + getSignalStrength(cycleCount, x);
  };

  data.forEach((instruction) => {
    tickCycles();
    if (instruction === NO_OP) return;
    tickCycles();
    const [, value] = instruction.split(" ");
    x = x + Number(value);
  });
  return signalStrengthSum;
};

console.log(solve());

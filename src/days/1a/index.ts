import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const solve = () => {
  let max = 0;
  let currentTotal = 0;
  data.forEach((row) => {
    if (row === "") {
      if (currentTotal > max) {
        max = currentTotal;
      }
      currentTotal = 0;
      return;
    }
    currentTotal += Number(row);
  });
  return max;
};

console.log(solve());

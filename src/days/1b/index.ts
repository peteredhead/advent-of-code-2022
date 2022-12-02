import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const solve = () => {
  let topThree = [0, 0, 0];
  let currentTotal = 0;
  data.forEach((row) => {
    if (row === "") {
      const lowestValue = Math.min(...topThree);
      if (currentTotal > lowestValue) {
        const lowestPosition = topThree.indexOf(lowestValue);
        topThree[lowestPosition] = currentTotal;
      }
      currentTotal = 0;
      return;
    }
    currentTotal += Number(row);
  });
  return topThree.reduce((acc, val) => acc + val, 0);
};

console.log(solve());

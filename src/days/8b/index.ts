import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const solve = () => {
  const grid = data.map((row) => row.split("").map(Number));
  let bestScore = 0;
  grid.forEach((row, rowIndex) => {
    row.forEach((_, columnIndex) => {
      const tree = grid[rowIndex][columnIndex];
      let leftScore = 0;
      for (let cPos = columnIndex - 1; cPos >= 0; cPos--) {
        leftScore++;
        if (tree <= grid[rowIndex][cPos]) break;
      }
      let rightScore = 0;
      for (let cPos = columnIndex + 1; cPos < grid[0].length; cPos++) {
        rightScore++;
        if (tree <= grid[rowIndex][cPos]) break;
      }
      let upScore = 0;
      for (let rPos = rowIndex - 1; rPos >= 0; rPos--) {
        upScore++;
        if (tree <= grid[rPos][columnIndex]) break;
      }
      let downScore = 0;
      for (let rPos = rowIndex + 1; rPos < grid.length; rPos++) {
        downScore++;
        if (tree <= grid[rPos][columnIndex]) break;
      }
      const score = leftScore * rightScore * upScore * downScore;
      if (score > bestScore) bestScore = score;
    });
  });
  return bestScore;
};

console.log(solve());

import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.orig.txt"));

const findInGrid = (charToFind: string, rows: number[][]): number =>
  rows.findIndex((row) => row.includes(charToFind.charCodeAt(0)));

const findInRow = (charToFind: string, row: number[]): number =>
  row.findIndex((value) => value === charToFind.charCodeAt(0));

const moves = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const solve = () => {
  let grid = data.map((row) => row.split("").map((cell) => cell.charCodeAt(0)));

  const process = (startRow: number, startColumn: number) => {
    const queue = [];
    grid = data.map((row) => row.split("").map((cell) => cell.charCodeAt(0)));
    const visitedGrid = data.map((row) => row.split("").map(() => false));
    const endRow = findInGrid("E", grid);
    const endColumn = findInRow("E", grid[endRow]);

    grid[startRow][startColumn] = "a".charCodeAt(0);
    grid[endRow][endColumn] = "z".charCodeAt(0) + 1;

    const start = [startRow, startColumn];
    const end = [endRow, endColumn];

    queue.push([start]);
    visitedGrid[startRow][startColumn] = true;

    const moveIsInBounds = (row: number, column: number) =>
      row >= 0 && row < grid.length && column >= 0 && column < grid[0].length;

    while (queue.length > 0) {
      const path = queue.shift();
      const pos = path[path.length - 1];

      if (pos[0] == end[0] && pos[1] == end[1]) {
        return path.concat([end]).length - 2;
      }

      moves
        .map(([r, c]) => [pos[0] + r, pos[1] + c])
        .forEach(([row, column]) => {
          if (
            moveIsInBounds(row, column) &&
            !visitedGrid[row][column] &&
            grid[row][column] <= grid[pos[0]][pos[1]] + 1
          ) {
            visitedGrid[row][column] = true;
            queue.push(path.concat([[row, column]]));
          }
        });
    }
  };

  const attempts = [];

  grid.forEach((row, rowIndex) =>
    row.forEach((cell, columnIndex) => {
      if (cell === "a".charCodeAt(0)) {
        attempts.push(process(rowIndex, columnIndex));
      }
    })
  );
  return Math.min(...attempts.filter(Boolean));
};

console.log(solve());

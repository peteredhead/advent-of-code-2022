import { fileToArray, readFile } from "../../helpers/file";
const rows = fileToArray(readFile(__dirname, "input.txt"));

const reverse = <T>(elements: T[]): T[] => elements.slice().reverse();

const solve = () => {
  const visibleTrees = new Set();
  const columnCount = rows[0].length;
  const rowCount = rows.length;

  const isOuter = (row: number, column: number) =>
    row === 0 ||
    column === 0 ||
    row === rowCount - 1 ||
    column === columnCount - 1;

  const markVisible = (column: number, row: number) =>
    visibleTrees.add(`${column}_${row}`);

  rows.forEach((row, rowIndex) => {
    const columns = row.split("").map(Number);
    // LEFT
    columns.forEach((tree, columnIndex) => {
      if (
        isOuter(rowIndex, columnIndex) ||
        tree > Math.max(...columns.slice(0, columnIndex))
      ) {
        markVisible(columnIndex, rowIndex);
      }
    });
    // RIGHT
    reverse(columns).forEach((tree, columnIndex, trees) => {
      if (
        isOuter(rowIndex, columnIndex) ||
        tree > Math.max(...trees.slice(0, columnIndex))
      ) {
        markVisible(columns.length - columnIndex - 1, rowIndex);
      }
    });
  });
  Array(columnCount)
    .fill(0)
    .forEach((_, columnIndex) => {
      // TOP
      let col = [];
      rows.forEach((row, rowIndex) => {
        const tree = Number(row.charAt(columnIndex));
        if (isOuter(rowIndex, columnIndex) || tree > Math.max(...col)) {
          markVisible(columnIndex, rowIndex);
        }
        col.push(tree);
      });
      // BOTTOM
      col = [];
      reverse(rows).forEach((row, rowIndex) => {
        const tree = Number(row.charAt(columnIndex));
        if (isOuter(rowIndex, columnIndex) || tree > Math.max(...col)) {
          markVisible(columnIndex, rows.length - rowIndex - 1);
        }
        col.push(tree);
      });
    });
  return visibleTrees.size;
};

console.log(solve());

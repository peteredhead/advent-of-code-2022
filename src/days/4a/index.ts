import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const solve = () =>
  data.reduce((containsCount, row) => {
    const [, elf1Start, , elf1End, , elf2Start, , elf2End] = row
      .split(/(\d+)/)
      .map(Number);
    const contains =
      (elf2End >= elf1End && elf2Start <= elf1Start) ||
      (elf1End >= elf2End && elf1Start <= elf2Start);
    return containsCount + (contains ? 1 : 0);
  }, 0);

console.log(solve());

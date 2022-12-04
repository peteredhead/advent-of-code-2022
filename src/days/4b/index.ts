import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const solve = () =>
  data.reduce((overlapCount, row) => {
    const [, elf1Start, , elf1End, , elf2Start, , elf2End] = row
      .split(/(\d+)/)
      .map(Number);
    const noOverlap =
      (elf1Start < elf2Start && elf1End < elf2Start) ||
      (elf2Start < elf1Start && elf2End < elf1Start);
    return overlapCount + (noOverlap ? 0 : 1);
  }, 0);

console.log(solve());

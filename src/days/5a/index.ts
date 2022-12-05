import { fileToArray, readFile } from "../../helpers/file";
const data = readFile(__dirname, "input.txt");

const stacks = {};

const prepare = () => {
  const [initialState, moves] = data.split("\n\n");
  const rows = initialState.split("\n").reverse();
  const stackKeys = rows.shift().trim().split(/\s+/).map(Number);
  stackKeys.forEach(
    (stack) =>
      (stacks[stack] = rows
        .map((row) => row.charAt(stack * 4 - 3))
        .filter((val) => val !== " "))
  );
  return moves;
};

const move = (from: number, to: number) => stacks[to].push(stacks[from].pop());

const solve = (moves: string[]) => {
  moves.forEach((row) => {
    const [, numberOfCrates, , fromStack, , toStack] = row
      .split(/(\d+)/)
      .map(Number);
    Array(numberOfCrates)
      .fill(0)
      .forEach(() => move(fromStack, toStack));
  });
  return Object.values(stacks)
    .map((stack: string) => stack[stack.length - 1])
    .join("");
};

const moves = prepare();

console.log(solve(fileToArray(moves)));

import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const solve = () => {
  return data
    .map((row) => {
      const midPoint = row.length / 2;
      const firstCompartment = row.slice(0, midPoint).split("");
      const secondCompartment = row.slice(midPoint).split("");
      const common = firstCompartment.filter((value) =>
        secondCompartment.includes(value)
      );
      const priority = priorities.indexOf(common[0]);
      return priority;
    })
    .reduce((acc, val) => acc + val, 0);
};

console.log(solve());

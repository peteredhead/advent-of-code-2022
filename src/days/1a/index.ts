import { fileToArray, readFile } from "../../helpers/file";

const solve = () => {
  const data = fileToArray(readFile(__dirname, "input.txt"));
  return data.reduce((accumulator, currentValue, index, values) => {
    if (index === 0) {
      console.log(`${currentValue} (N/A No previous measurement)`);
      return 0;
    }
    if (Number(currentValue) > Number(values[index - 1])) {
      console.log(`${currentValue} (increased)`);
      return accumulator + 1;
    }
    console.log(`${currentValue} (decreased)`);
    return accumulator;
  }, 0);
};

console.log(solve());

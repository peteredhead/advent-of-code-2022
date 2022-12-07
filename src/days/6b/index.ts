import { readFile } from "../../helpers/file";
const data = readFile(__dirname, "input.txt");

const msgLength = 14;

const solve = () => {
  for (let index = 0; index < data.length; index++) {
    const group = data.slice(index, index + msgLength);
    const uniqueChars = [...new Set(group)];
    if (uniqueChars.length === msgLength) {
      return index + msgLength;
    }
  }
};

console.log(solve());

import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const solve = () =>
  data.reduce((priorityCount, thirdGroup, index, allGroups) => {
    if (index % 3 < 2) return priorityCount;
    const firstGroupArray = allGroups[index - 2].split("");
    const secondGroupArray = allGroups[index - 1].split("");
    const common = thirdGroup
      .split("")
      .filter(
        (value) =>
          firstGroupArray.includes(value) && secondGroupArray.includes(value)
      );
    return priorityCount + priorities.indexOf(common[0]);
  }, 0);

console.log(solve());

import { isArray } from "util";
import { fileToArray, readFile } from "../../helpers/file";
const data = readFile(__dirname, "input.txt").split("\n");

const CORRECT = -1;
const WRONG = 1;

const compareSingleValues = (left: string, right: string) => {
  if (Number(left) < Number(right)) return CORRECT;
  if (Number(left) > Number(right)) return WRONG;
};

const isSingleValue = (value: string | string[]) => !Array.isArray(value);

const solve = () => {
  const compare = (left: string | string[], right: string | string[]) => {
    console.log("Compare ", JSON.stringify(left), "vs", JSON.stringify(right));
    if (isSingleValue(left) && isSingleValue(right)) {
      const result = compareSingleValues(String(left), String(right));
      if (result === CORRECT) {
        console.log("- Left side is smaller, so inputs are in the right order");
        return result;
      }
      if (result === WRONG) {
        console.log(
          "- Right side is smaller, so inputs are not in the right order"
        );
        return result;
      }
    }
    if (!isSingleValue(left) && !isSingleValue(right)) {
      for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const result = compare(left[i], right[i]);
        if (result === CORRECT || result === WRONG) {
          return result;
        }
      }
      if (left.length < right.length) {
        console.log(
          "- Left side ran out of items, so inputs are in the right order"
        );
        return CORRECT;
      }
      if (left.length > right.length) {
        console.log(
          "- Right side ran out of items, so inputs are not in the right order"
        );
        return WRONG;
      }
    }
    if (
      (isSingleValue(left) && !isSingleValue(right)) ||
      (!isSingleValue(left) && isSingleValue(right))
    ) {
      console.log("(Mixed types. Convert and retry)");
      const newLeft = Array.isArray(left) ? left : [left];
      const newRight = Array.isArray(right) ? right : [right];
      const result = compare(newLeft, newRight);
      if (result === CORRECT || result === WRONG) {
        return result;
      }
    }
  };

  const divider1 = [[2]];
  const divider2 = [[6]];

  const mappedData = data
    .filter((val) => val.length > 0)
    .map((val) => JSON.parse(val));

  mappedData.push(divider1, divider2);

  const sorted = mappedData.slice().sort(compare);

  const firstPacketIndex = sorted.indexOf(divider1) + 1;
  const secondPacketIndex = sorted.indexOf(divider2) + 1;

  return firstPacketIndex * secondPacketIndex;
};

console.log(solve());

import { fileToArray, readFile } from "../../helpers/file";
const data = readFile(__dirname, "input.orig.txt");

const NUM_ROUNDS = 20;

type Monkey = {
  startingItems: number[];
  operation: string;
  testDivisor: number;
  trueAction: number;
  falseAction: number;
};

const inspectCount = {};
const monkeys: Record<string, Monkey> = {};

data.split("\n\n").forEach((monkeyData) => {
  const rows = fileToArray(monkeyData);
  const monkey = rows[0].slice(0, -1);
  const [, , divisibleBy] = rows[3].slice(8).split(" ");
  monkeys[monkey] = {
    startingItems: rows[1].slice(18).split(", ").map(Number),
    operation: rows[2].slice(13),
    testDivisor: Number(divisibleBy),
    trueAction: Number(rows[4].match(/\d+/)),
    falseAction: Number(rows[5].match(/\d+/)),
  };
});

const getValue = (value: string, old: number) =>
  value === "old" ? old : Number(value);

const performOperation = (operation: string, old: number) => {
  const [, , , operand, valueString] = operation.split(" ");
  const value = getValue(valueString, old);
  switch (operand) {
    case "+":
      return old + value;
    case "-":
      return old - value;
    case "*":
      return old * value;
    case "/":
      return old / value;
  }
};

const throwToMonkey = (monkeyId: number, value: number) =>
  monkeys[`Monkey ${monkeyId}`].startingItems.push(value);

const processItems = (monkeyId: string) => {
  const monkey = monkeys[monkeyId];
  while (monkey.startingItems.length > 0) {
    inspectCount[monkeyId] = (inspectCount[monkeyId] ?? 0) + 1;
    const initialWorryLevel = monkey.startingItems.shift();
    const operationWorryLevel = performOperation(
      monkey.operation,
      initialWorryLevel
    );
    const boredWorryLevel = Math.floor(operationWorryLevel / 3);
    const nextMonkey =
      boredWorryLevel % monkey.testDivisor === 0
        ? monkey.trueAction
        : monkey.falseAction;
    throwToMonkey(nextMonkey, boredWorryLevel);
  }
};

const doRound = () =>
  Object.keys(monkeys).forEach((monkey) => processItems(monkey));

const solve = () => {
  new Array(NUM_ROUNDS).fill(0).forEach(() => doRound());
  const mostInspected = Object.values<number>(inspectCount).sort(
    (a, b) => b - a
  );
  return mostInspected[0] * mostInspected[1];
};

console.log(solve());

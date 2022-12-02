import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const opponentMoves = { A: 1, B: 2, C: 3 };
const gameResults = { X: 0, Y: 3, Z: 6 };

const calculateMove = (theirScore: number, gameResult: string) => {
  switch (gameResult) {
    case "X":
      return theirScore - 1 === 0 ? 3 : theirScore - 1;
    case "Y":
      return theirScore;
    default:
      return theirScore + 1 > 3 ? 1 : theirScore + 1;
  }
};

const solve = () =>
  data
    .map((round) => {
      const [opponentMove, gameResult] = round.split(" ");
      const roundScore = gameResults[gameResult];
      const myMoveScore = calculateMove(
        opponentMoves[opponentMove],
        gameResult
      );
      return myMoveScore + roundScore;
    })
    .reduce((acc, val) => acc + val, 0);

console.log(solve());

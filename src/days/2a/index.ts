import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const opponentMoves = { A: 1, B: 2, C: 3 };
const myMoves = { X: 1, Y: 2, Z: 3 };

const calculateScore = (me: number, them: number) => {
  switch (them - me) {
    case 0:
      return 3;
    case -1:
    case 2:
      return 6;
    default:
      return 0;
  }
};

const solve = () =>
  data
    .map((round) => {
      const [opponentMove, myMove] = round.split(" ");
      const myMoveScore = myMoves[myMove];
      const roundScore = calculateScore(
        myMoves[myMove],
        opponentMoves[opponentMove]
      );
      return myMoveScore + roundScore;
    })
    .reduce((acc, val) => acc + val, 0);

console.log(solve());

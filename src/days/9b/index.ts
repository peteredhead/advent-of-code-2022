import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const WIDTH = 2000; // Arbitrary values. Could probably calculate these from input
const HEIGHT = 2000;

const generatePosition = (x: number, y: number) => ({ x, y });

const solve = () => {
  const grid = Array(WIDTH)
    .fill(0)
    .map(() => Array(HEIGHT).fill(" "));
  let headX = WIDTH / 2;
  let headY = HEIGHT / 2;
  const positions = new Array(10)
    .fill(0)
    .map(() => generatePosition(headX, headY));

  grid[headX][headY] = "#";

  data.forEach((row) => {
    const [direction, distance] = row.split(" ");
    for (let i = 0; i < Number(distance); i++) {
      switch (direction) {
        case "R":
          positions[0].x++;
          break;
        case "L":
          positions[0].x--;
          break;
        case "U":
          positions[0].y--;
          break;
        case "D":
          positions[0].y++;
      }
      for (let iPos = 1; iPos < positions.length; iPos++) {
        const leader = positions[iPos - 1];
        const follower = positions[iPos];
        const distance =
          Math.abs(leader.x - follower.x) + Math.abs(leader.y - follower.y);
        if (distance < 2) {
          // do nothing
        } else {
          // same row or column
          if (leader.y === follower.y) {
            // same row
            if (leader.x > follower.x) {
              positions[iPos].x++;
            } else {
              positions[iPos].x--;
            }
          } else if (leader.x === follower.x) {
            // same column
            if (leader.y > follower.y) {
              positions[iPos].y++;
            } else {
              positions[iPos].y--;
            }
          } else {
            if (distance > 2) {
              // move diagonal
              if (leader.x > follower.x) {
                positions[iPos].x++;
              } else {
                positions[iPos].x--;
              }
              if (leader.y > follower.y) {
                positions[iPos].y++;
              } else {
                positions[iPos].y--;
              }
            }
          }
        }
        if (iPos === positions.length - 1) {
          grid[positions[iPos].x][positions[iPos].y] = "#";
        }
      }
    }
  });

  const line = grid.map((x) => x.join("")).join("");
  const count = line.split("").filter((y) => y === "#").length;
  return count;
};

console.log(solve());

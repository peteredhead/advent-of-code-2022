import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const WIDTH = 1000;
const HEIGHT = 1000;

const solve = () => {
  const grid = Array(WIDTH)
    .fill(0)
    .map(() => Array(HEIGHT).fill(0));
  let headX = WIDTH / 2;
  let headY = HEIGHT / 2;
  let tailX = headX;
  let tailY = headY;
  let tailPosSet = false;
  grid[headX][headY] = "s";

  data.forEach((row) => {
    const [direction, distance] = row.split(" ");
    
    for (let i = 0; i < Number(distance); i++) {
      switch (direction) {
        case "R":
          headX++;
          break;
        case "L":
          headX--;
          break;
        case "U":
          headY--;
          break;
        case "D":
          headY++;
      }

      const tailDistance = Math.abs(headX - tailX) + Math.abs(headY - tailY);
      if (!tailPosSet || tailDistance < 2) {
        // do nothing
        tailPosSet = true;
      } else {
        // same row or column
        if (headY === tailY) {
          // same row
          if (headX > tailX) {
            tailX++;
          } else {
            tailX--;
          }
        } else if (headX === tailX) {
          // same column
          if (headY > tailY) {
            tailY++;
          } else {
            tailY--;
          }
        } else {
          if (tailDistance > 2) {
            // move diagonal
            if (headX > tailX) {
              tailX++;
            } else {
              tailX--;
            }
            if (headY > tailY) {
              tailY++;
            } else {
              tailY--;
            }
          }
        }
      }
      grid[tailX][tailY] = "#";
    }
  });
  const line = grid.map((x) => x.join("")).join("");
  const count = line.split("").filter((y) => y === "#").length;
  return count;
};

console.log(solve());

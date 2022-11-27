import fs from "fs";
import path from "path";

export const readFile = (folder: string, filename: string) =>
  fs.readFileSync(path.join(folder, filename), {
    encoding: "utf8",
    flag: "r",
  });

export const fileToArray = (file: string) => file.split("\n");

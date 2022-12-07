import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const getFolderAndParents = (currentPath: string[]) =>
  currentPath.map((_, index, path) => path.slice(0, index + 1).join("/"));

const getFolderSizes = (input: string[]) => {
  const currentPath = [];
  return input.reduce((folderSizes, row) => {
    if (row.indexOf("$ cd") === 0) {
      const [, cmd, path] = row.split(" ");
      path === ".." ? currentPath.pop() : currentPath.push(path);
    } else if (row.match(/\d+ .*/)) {
      const [size] = row.split(" ");
      getFolderAndParents(currentPath)
        .filter((path) => path !== "")
        .forEach(
          (path) =>
            (folderSizes[path] = (folderSizes[path] ?? 0) + Number(size))
        );
    }
    return folderSizes;
  }, {});
};

const solve = () =>
  Object.values(getFolderSizes(data)).reduce(
    (total: number, size: number) => (size <= 100000 ? total + size : total),
    0
  );

console.log(solve());

import { fileToArray, readFile } from "../../helpers/file";
const data = fileToArray(readFile(__dirname, "input.txt"));

const FILESYSTEM_SIZE = 70000000;
const UPDATE_SIZE = 30000000;

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

const solve = () => {
  const folderSizes = getFolderSizes(data);
  const currentSpaceAvailable = FILESYSTEM_SIZE - folderSizes["/"];
  const requiredSpace = UPDATE_SIZE - currentSpaceAvailable;
  return Math.min(
    ...Object.values<number>(folderSizes).filter(
      (folderSize) => folderSize >= requiredSpace
    )
  );
};

console.log(solve());

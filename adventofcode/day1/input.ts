import { recoverCalibrator } from "./index";
import fs from "fs/promises";
import path from "node:path";
const run = async () => {
  const lines = await fs.readFile(path.join(__dirname, "./input.csv"));
  return lines
    .toString()
    .split(/\n/g)
    .filter(Boolean)
    .map((line) => Number(recoverCalibrator(line)))
    .reduce((acc, el) => acc + el, 0);
};

run().then(console.log).catch(console.error);

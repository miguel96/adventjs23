import fs from "fs/promises";
import path from "node:path";
import { getNextValue, getPrevValue } from "./index";

const run = async () => {
  const file = await fs.readFile(path.join(__dirname, "./input.csv"));
  const input = file.toString().split("\n").filter(Boolean);
  const nextValue = input
    .map((el) => getNextValue(el))
    .reduce((acc, el) => acc + el, 0);
  const prevValue = input
    .map((el) => getPrevValue(el))
    .reduce((acc, el) => acc + el, 0);
  return { prevValue, nextValue };
};

run().then(console.log).catch(console.error);

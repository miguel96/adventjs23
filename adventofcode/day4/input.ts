import fs from "fs/promises";
import path from "node:path";
import { getCardPoints, getInputsPrizes } from "./index";

const run = async () => {
  const file = await fs.readFile(path.join(__dirname, "./input.csv"));
  const inputs = file.toString().split("\n").filter(Boolean);
  return getInputsPrizes(inputs);
  // return inputs
  //   .map((input) => getCardPoints(input))
  //   .reduce((acc, el) => acc + el, 0);
};

run().then(console.log).catch(console.error);

import fs from "fs/promises";
import path from "node:path";
import { getLowersLocation } from "./index";

const run = async () => {
  const file = await fs.readFile(path.join(__dirname, "./input.csv"));
  const input = file.toString();
  return getLowersLocation(input);
  // return inputs
  //   .map((input) => getCardPoints(input))
  //   .reduce((acc, el) => acc + el, 0);
};

run().then(console.log).catch(console.error);

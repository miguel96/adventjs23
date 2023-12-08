import fs from "fs/promises";
import path from "node:path";
import { getSteps } from "./index";

const run = async () => {
  const file = await fs.readFile(path.join(__dirname, "./input.csv"));
  const input = file.toString();
  return getSteps(input);
};

run().then(console.log).catch(console.error);

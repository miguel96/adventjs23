import fs from "fs/promises";
import path from "node:path";
import { getValidOptions, getValidOptions2 } from "./index";

const run = async () => {
  const file = await fs.readFile(path.join(__dirname, "./input.csv"));
  const input = file.toString();
  return getValidOptions2(input);
};

run().then(console.log).catch(console.error);

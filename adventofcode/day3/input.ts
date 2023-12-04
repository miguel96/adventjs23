import fs from "fs/promises";
import path from "node:path";
import { getGearRations, getPartNumberSum } from "./index";

const run = async () => {
  const file = await fs.readFile(path.join(__dirname, "./input.csv"));
  return getGearRations(file.toString());
};

run().then(console.log).catch(console.error);

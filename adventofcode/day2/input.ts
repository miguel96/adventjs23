import fs from "fs/promises";
import { getGamePower, isPossibleGame } from "./index";
import path from "node:path";

const possibleGames = async () => {
  const inputs = await fs.readFile(path.join(__dirname, "./input.csv"));
  return inputs
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((el) => {
      return isPossibleGame(el);
    })
    .filter((el) => el.isPossible)
    .reduce((acc, el) => acc + el.id, 0);
};

const gamesPotential = async () => {
  const inputs = await fs.readFile(path.join(__dirname, "./input.csv"));
  return inputs
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((el) => {
      return getGamePower(el);
    })
    .reduce((acc, el) => acc + el, 0);
};

gamesPotential()
  .then((resp) => console.log(`gamesPotential: ${resp}`))
  .catch(console.error);
possibleGames()
  .then((resp) => console.log(`possibleGames: ${resp}`))
  .catch(console.error);

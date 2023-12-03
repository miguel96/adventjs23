const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;
const checkColor = (color: string, count: number): boolean => {
  if (color === "red") {
    return count <= MAX_RED;
  }
  if (color === "green") {
    return count <= MAX_GREEN;
  }
  if (color === "blue") {
    return count <= MAX_BLUE;
  }

  return false;
};

export const isPossibleGame = (
  gameInfo: string,
): { id: number; isPossible: boolean } => {
  const [, gameId, turns] = gameInfo.match(/Game ([0-9]+): (.*)/) || [];
  const isPossible = turns
    .split(";")
    .filter(Boolean)
    .every((turn) => {
      let turnInfo = turn;
      const data = {};
      let match;
      let isValid = true;
      do {
        const [, count, color] =
          /([0-9]+) (blue|green|red)/.exec(turnInfo) || [];
        turnInfo = turnInfo.replace(`${count} ${color}`, "");
        match = color;
        isValid = !color || checkColor(color, Number(count));
        //console.log({turnInfo,match,isValid,count})
      } while (match && isValid);
      return isValid;
    });
  return { id: Number(gameId), isPossible };
};

export const getGamePower = (gameInfo: string): number => {
  const [, gameId, turns] = gameInfo.match(/Game ([0-9]+): (.*)/) || [];
  const resp = turns
    .split(";")
    .filter(Boolean)
    .reduce<Record<string, number>>((data, turn) => {
      let turnInfo = turn;
      let match;
      do {
        const [, count, color] =
          /([0-9]+) (blue|green|red)/.exec(turnInfo) || [];
        turnInfo = turnInfo.replace(`${count} ${color}`, "");
        match = color;
        if (color) {
          data[color] = Math.max(data[color] || 0, Number(count));
        }
      } while (match);
      return data;
    }, {});
  return Object.values(resp).reduce((acc, el) => acc * el, 1);
};

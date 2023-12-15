export function createChristmasTree(ornaments: string, height: number) {
  const solution: string[] = [];
  const ornamentsList = ornaments.split("");
  let i = 0;
  let ornamentsIndex = 0;

  function getWhitespaces(whitespaces: number) {
    return new Array(whitespaces).fill(" ").join("");
  }

  while (i < height) {
    i += 1;
    let row = [];
    const whitespaces = height - i;
    while (row.length < i) {
      row.push(ornamentsList[ornamentsIndex % ornamentsList.length]);
      ornamentsIndex += 1;
    }
    solution.push(getWhitespaces(whitespaces) + row.join(" ") + "\n");
  }
  return solution.join("") + getWhitespaces(Math.max(0, height - 1)) + "|\n";
}

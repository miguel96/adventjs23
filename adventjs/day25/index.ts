export function travelDistance(map: string) {
  type Position = [row: number, column: number];
  const mapWithCoordinates = map.split("\n").map((el) => el.split(""));
  let santaPosition: Position = [0, 0];
  let kids: { position: Position; id: number }[] = [];
  mapWithCoordinates.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === "S") {
        santaPosition = [rowIndex, columnIndex];
      }
      if (Number.isInteger(Number(cell))) {
        kids.push({ position: [rowIndex, columnIndex], id: Number(cell) });
      }
    });
  });

  return kids
    .sort((a, b) => a.id - b.id)
    .reduce((acc, kid) => {
      const distance =
        Math.abs(kid.position[1] - santaPosition[1]) +
        Math.abs(kid.position[0] - santaPosition[0]);
      santaPosition = kid.position;
      return acc + distance;
    }, 0);
}

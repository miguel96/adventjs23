export function distributeGifts(weights: (number | null)[][]) {
  const getNeighbours = (rowIndex: number, columnIndex: number) => {
    return [
      weights?.[rowIndex]?.[columnIndex + 1],
      weights?.[rowIndex]?.[columnIndex - 1],
      weights?.[rowIndex - 1]?.[columnIndex],
      weights?.[rowIndex + 1]?.[columnIndex],
      weights?.[rowIndex]?.[columnIndex],
    ].filter((el): el is number => !!el);
  };
  return weights.map((row, rowIndex) => {
    return row.map((cell, columnIndex) => {
      const neighbours = getNeighbours(rowIndex, columnIndex);
      return Math.round(
        neighbours.reduce((acc, el) => acc + el, 0) / neighbours.length,
      );
    });
  });
}

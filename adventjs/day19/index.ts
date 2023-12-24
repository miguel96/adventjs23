export function revealSabotage(store: string[][]) {
  const editableStore = [...store.map((row) => [...row])];
  const addOne = (column: number, row: number) => {
    const cellValue = editableStore?.[row]?.[column];
    if (!cellValue || cellValue === "*") {
      return;
    }

    editableStore[row][column] = (Number(cellValue || "0") + 1).toString();
  };
  editableStore.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === "*") {
        addOne(columnIndex + 1, rowIndex);
        addOne(columnIndex - 1, rowIndex);
        addOne(columnIndex, rowIndex + 1);
        addOne(columnIndex, rowIndex - 1);
        addOne(columnIndex - 1, rowIndex - 1);
        addOne(columnIndex + 1, rowIndex - 1);
        addOne(columnIndex - 1, rowIndex + 1);
        addOne(columnIndex + 1, rowIndex + 1);
      }
    });
  });
  return editableStore;
}

export function autonomousDrive(store: string[], movements: string[]) {
  const storeArray = store.map((el) => el.split(""));

  let robotRow = storeArray.findIndex((el) => el.includes("!"));
  let robotColumn = storeArray[robotRow].findIndex((el) => el === "!");
  storeArray[robotRow][robotColumn] = ".";
  movements.forEach((movement) => {
    const oldRow = robotRow;
    const oldColumn = robotColumn;
    if (movement === "R") {
      robotColumn += 1;
    }
    if (movement === "L") {
      robotColumn -= 1;
    }
    if (movement === "D") {
      robotRow += 1;
    }
    if (movement === "U") {
      robotRow -= 1;
    }
    if (["*", undefined].includes(storeArray?.[robotRow]?.[robotColumn])) {
      robotRow = oldRow;
      robotColumn = oldColumn;
    }
  });
  storeArray[robotRow][robotColumn] = "!";
  return storeArray.map((el) => el.join(""));
}

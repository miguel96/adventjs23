export const getPartNumberSum = (input: string): number => {
  return new NumbersProcessor(input).run();
};

export const getGearRations = (input: string): number => {
  return new GearProcessor2(input).run();
};

class DataGrid {
  constructor(private readonly data: string[][]) {}
  getCell(column: number, row: number): string {
    return this.data[column]?.[row];
  }
  getCellWithPosition(position: Position) {
    return this.getCell(position.getColumn(), position.getRow());
  }
  getRowLength(column: number) {
    return this.data[column].length;
  }

  getColumnsLength() {
    return this.data.length;
  }

  getCellsRange(columnIndex: number, rowStart: number, rowEnd: number) {
    return this.data[columnIndex].slice(rowStart, rowEnd).join("");
  }
  getCellsRangeWithRange(range: Range) {
    return this.data[range.getColumn()]
      .slice(range.getRowStart(), range.getRowEnd() + 1)
      .join("");
  }

  hasAround(column: number, row: number, checkFn: (input: string) => boolean) {
    const toNumber = (result: boolean) => (result ? 1 : 0);
    return (
      toNumber(checkFn(this.getCell(column - 1, row - 1))) +
      toNumber(checkFn(this.getCell(column - 1, row))) +
      toNumber(checkFn(this.getCell(column - 1, row + 1))) +
      toNumber(checkFn(this.getCell(column, row - 1))) +
      toNumber(checkFn(this.getCell(column, row))) +
      toNumber(checkFn(this.getCell(column, row + 1))) +
      toNumber(checkFn(this.getCell(column + 1, row - 1))) +
      toNumber(checkFn(this.getCell(column + 1, row))) +
      toNumber(checkFn(this.getCell(column + 1, row + 1)))
    );
  }
}
class Position {
  private readonly row: number;
  private readonly column: number;
  constructor(args: { row: number; column: number }) {
    this.row = args.row;
    this.column = args.column;
  }
  getRow() {
    return this.row;
  }
  getColumn() {
    return this.column;
  }
}

class Range {
  constructor(
    private readonly column: number,
    private readonly rowStart: number,
    private readonly rowEnd: number,
  ) {}
  getColumn() {
    return this.column;
  }
  getRowStart() {
    return this.rowStart;
  }
  getRowEnd() {
    return this.rowEnd;
  }
  isAdjacentTo(position: Position) {
    if (Math.abs(this.column - position.getColumn()) > 1) {
      return false;
    }
    return (
      this.rowStart - 1 <= position.getRow() &&
      this.rowEnd + 1 >= position.getRow()
    );
  }
}

class GearProcessor2 {
  private gears: number;
  private dataGrid: DataGrid;
  constructor(input: string) {
    this.dataGrid = new DataGrid(input.split("\n").map((row) => row.split("")));
    this.gears = 0;
  }

  run() {
    let rowIndex = 0;
    let columnIndex = 0;
    const gearPositions: Position[] = [];
    const numbers: { number: number; range: Range }[] = [];
    while (columnIndex < this.dataGrid.getColumnsLength()) {
      while (rowIndex < this.dataGrid.getRowLength(columnIndex)) {
        const item = this.dataGrid.getCellWithPosition(
          new Position({ column: columnIndex, row: rowIndex }),
        );
        if (this.isGear(item)) {
          gearPositions.push(
            new Position({ column: columnIndex, row: rowIndex }),
          );
        }
        if (this.isNumber(item)) {
          const { number, range } = this.getFullNumber(
            new Position({ column: columnIndex, row: rowIndex }),
          );
          numbers.push({ number, range });
          // Jump until the end of the number to avoid register it twice
          rowIndex = range.getRowEnd();
        }
        rowIndex += 1;
      }
      rowIndex = 0;
      columnIndex += 1;
    }
    console.log(JSON.stringify({ gears: gearPositions, numbers }));
    return gearPositions
      .map((gearPosition) => {
        const adjancentNumbers = numbers.filter((number) => {
          const isAdjacent = number.range.isAdjacentTo(gearPosition);
          return isAdjacent;
        });
        console.log("adjacentCount", adjancentNumbers.length);

        if (adjancentNumbers.length !== 2) {
          return 0;
        }
        const adjacentItems = adjancentNumbers.map((number) => number.number);
        console.log("adjacent", adjacentItems);
        return adjacentItems.reduce((acc, el) => acc * el, 1);
      })
      .reduce((acc, el) => acc + el, 0);
  }

  private isGear(item: string) {
    return item === "*";
  }

  private isNumber(item: string) {
    return !Number.isNaN(Number(item));
  }

  private getFullNumber(position: Position) {
    const row = position.getRow();
    const column = position.getColumn();
    let minIndex = row;
    const checkCell = (index: number) => {
      const cell = this.dataGrid.getCellWithPosition(
        new Position({ column, row: index }),
      );
      const isNumber = this.isNumber(cell);
      return isNumber;
    };
    let isNumber = checkCell(minIndex);
    while (isNumber && minIndex > 0) {
      isNumber = checkCell(minIndex - 1);
      if (isNumber) {
        minIndex -= 1;
      }
    }

    let maxIndex = row;
    isNumber = checkCell(maxIndex);
    while (isNumber && maxIndex < this.dataGrid.getRowLength(column)) {
      isNumber = checkCell(maxIndex + 1);
      if (isNumber) {
        maxIndex += 1;
      }
    }
    const range = new Range(column, minIndex, maxIndex);
    console.log(
      "number is",
      Number(this.dataGrid.getCellsRangeWithRange(range)),
      { column, minIndex, maxIndex },
    );
    const number = Number(this.dataGrid.getCellsRangeWithRange(range));

    return { number, range };
  }
}
class NumbersProcessor {
  private numbers: number;
  private numberStart: number | undefined;
  private dataGrid: DataGrid;
  constructor(input: string) {
    this.dataGrid = new DataGrid(input.split("\n").map((row) => row.split("")));
    this.numbers = 0;
  }

  run() {
    let rowIndex = 0;
    let columnIndex = 0;
    while (columnIndex < this.dataGrid.getColumnsLength()) {
      const rowLength = this.dataGrid.getRowLength(columnIndex);
      while (rowIndex < rowLength) {
        const item = this.dataGrid.getCell(columnIndex, rowIndex);
        this.processItem(item, rowIndex, columnIndex);
        rowIndex += 1;
      }
      this.handleNumberEnd(rowIndex, columnIndex);
      rowIndex = 0;
      columnIndex += 1;
    }
    return this.numbers;
  }

  private processItem(item: string, rowIndex: number, columnIndex: number) {
    if (this.isNumber(item)) {
      if (this.numberStart === undefined) {
        this.numberStart = rowIndex;
      }
    } else {
      this.handleNumberEnd(rowIndex, columnIndex);
    }
  }

  private handleNumberEnd(rowIndex: number, columnIndex: number) {
    if (this.numberStart !== undefined) {
      if (this.hasAroundRange(rowIndex, columnIndex)) {
        this.numbers += Number(
          this.dataGrid.getCellsRange(columnIndex, this.numberStart, rowIndex),
        );
      }
      this.numberStart = undefined;
    }
  }

  private isNumber(item: string) {
    return !Number.isNaN(Number(item));
  }

  private isSymbol(item: string) {
    if (!item) {
      return false;
    }
    return Number.isNaN(Number(item)) && item !== ".";
  }

  private hasAroundRange(
    rowIndex: number,
    columnIndex: number,
    checkFn = this.isSymbol,
  ) {
    if (this.numberStart === undefined) {
      throw Error("numberStartNotFound");
    }
    let index = this.numberStart;

    const rowLength = this.dataGrid.getRowLength(columnIndex);
    let hasSymbol = false;
    while (index < rowLength && index < rowIndex && !hasSymbol) {
      if (this.dataGrid.hasAround(columnIndex, index, checkFn)) {
        hasSymbol = true;
      }
      index += 1;
    }
    return hasSymbol;
  }
}

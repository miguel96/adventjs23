export const getShortestPaths = (input: string, expandDistance = 2) => {
  return new Galaxy(input, expandDistance).getGalaxiesDistance();
};

class Position {
  constructor(
    public column: number,
    public row: number,
  ) {}
  toString() {
    return `${this.row}:${this.column}`;
  }
}

class Map {
  private map: string[][];

  private expandedRows: number[] = [];
  private expandedColumns: number[] = [];
  constructor(input: string) {
    this.map = input.split("\n").map((row) => row.split(""));
  }

  getShortestPath(from: Position, to: Position) {
    let [startRow, endRow] = [from.row, to.row].sort((a, b) => a - b);
    let [startColumn, endColumn] = [from.column, to.column].sort(
      (a, b) => a - b,
    );
    let extraDistance = 0;
    let baseDistance = 0;
    while (startRow < endRow) {
      if (this.expandedRows.includes(startRow)) {
        extraDistance += 1;
      } else {
        baseDistance += 1;
      }
      startRow += 1;
    }
    while (startColumn < endColumn) {
      if (this.expandedColumns.includes(startColumn)) {
        extraDistance += 1;
      } else {
        baseDistance += 1;
      }
      startColumn += 1;
    }
    return new GalaxyDistance(baseDistance, extraDistance);
  }

  iterateCells(iterator: (cell: string, position: Position) => void) {
    this.map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        iterator(cell, new Position(columnIndex, rowIndex));
      });
    });
  }

  expandRow(rowIndex: number) {
    this.expandedRows.push(rowIndex);
  }
  expandColumn(columnIndex: number) {
    this.expandedColumns.push(columnIndex);
  }

  iterateRows(iterator: (row: string[], columnIndex: number) => void) {
    this.map.forEach((column, columnIndex) => {
      iterator(column, columnIndex);
    });
  }

  iterateColumns(iterator: (row: string[], rowIndex: number) => void) {
    let i = 0;
    while (i < this.map[0].length) {
      iterator(
        this.map.map((row) => row[i]),
        i,
      );
      i += 1;
    }
  }
}

class Galaxy {
  private galaxies: Position[];
  private map: Map;
  constructor(
    input: string,
    private expandDistance: number,
  ) {
    this.map = new Map(input);
    this.galaxies = [];
    this.map.iterateCells((cell, position) => {
      if (this.isGalaxy(cell)) {
        this.galaxies.push(position);
      }
    });
  }

  private isGalaxy(cell: string) {
    return cell === "#";
  }

  expand() {
    this.map.iterateRows((row, rowIndex) => {
      if (row.every((cell) => !this.isGalaxy(cell))) {
        this.map.expandRow(rowIndex);
      }
    });

    this.map.iterateColumns((column, columnIndex) => {
      if (column.every((cell) => !this.isGalaxy(cell))) {
        this.map.expandColumn(columnIndex);
      }
    });
  }

  getGalaxiesDistance() {
    this.expand();
    const galaxiesDistances = this.galaxies.reduce(
      (acc, galaxyPosition, i) => {
        const restGalaxies = this.galaxies.slice(i + 1);
        const resp = restGalaxies.reduce(
          (acc, nextGalaxy, secondI) => {
            const newGalaxyDistance = this.map.getShortestPath(
              galaxyPosition,
              nextGalaxy,
            );
            return acc.add(newGalaxyDistance);
          },
          new GalaxyDistance(0, 0),
        );
        return acc.add(resp);
      },
      new GalaxyDistance(0, 0),
    );
    return galaxiesDistances.toTotal(this.expandDistance);
  }
}

class GalaxyDistance {
  constructor(
    public baseDistance: number,
    public extraDistance: number,
  ) {}

  add(to: GalaxyDistance) {
    return new GalaxyDistance(
      this.baseDistance + to.baseDistance,
      this.extraDistance + to.extraDistance,
    );
  }

  toTotal(expandDistance: number) {
    return this.baseDistance + this.extraDistance * expandDistance;
  }
}

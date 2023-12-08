type Direction = "R" | "L";

export const getSteps = (input: string) => {
  const [steps, ...mapToParse] = input.split("\n");
  const map = mapToParse.filter(Boolean);
  return new Navigator(
    steps.split("").filter((dir: string): dir is Direction => {
      return ["R", "L"].includes(dir);
    }),
    map,
  ).run();
};

class Map {
  positions: Record<string, [left: string, right: string]> = {};
  constructor(map: string[]) {
    map.forEach((position) => {
      const [startPosition, nextPositions] = position
        .replace(/ /g, "")
        .split("=");
      const [left, right] = nextPositions
        .replace("(", "")
        .replace(")", "")
        .split(",");
      this.positions[startPosition] = [left, right];
    });
  }

  getNextPosition(direction: Direction, position: string) {
    if (direction === "R") {
      return this.positions[position][1];
    }
    return this.positions[position][0];
  }

  getPositionsEndingWith(char: string) {
    return Object.keys(this.positions).filter((position) =>
      position.endsWith(char),
    );
  }
}

class Ghost {
  private position: string;
  private stayedOnEndAt: number[] = [];
  constructor(
    position: string,
    private readonly map: Map,
  ) {
    this.position = position;
  }

  navigate(direction: Direction, navigationId: number) {
    this.position = this.map.getNextPosition(direction, this.position);
    if (this.isOnEnd()) {
      this.stayedOnEndAt.push(navigationId + 1);
    }
  }

  isOnEnd() {
    return this.position.endsWith("Z");
  }

  hasCompletedCycle() {
    return this.stayedOnEndAt.length > 3;
  }

  getCycle() {
    const [last, prev] = this.stayedOnEndAt.slice(0).reverse();
    return new Cycle(last - prev, this.stayedOnEndAt[0]);
  }
}

class Cycle {
  constructor(
    private readonly length: number,
    private readonly first: number,
  ) {}

  private getStepsAtCycleN(count: number) {
    return this.first + this.length * count;
  }

  getLength() {
    return this.length;
  }

  joinWith(cycle: Cycle) {
    let cycleMultiplier = 0;
    let thisCycleMultiplier = 0;
    let stepsAtCycleN = cycle.getStepsAtCycleN(cycleMultiplier);
    let thisStepsAtCycleN = this.getStepsAtCycleN(thisCycleMultiplier);
    while (stepsAtCycleN !== thisStepsAtCycleN) {
      if (stepsAtCycleN > thisStepsAtCycleN) {
        thisCycleMultiplier += Math.max(
          Math.floor((stepsAtCycleN - thisStepsAtCycleN) / this.getLength()),
          1,
        );
        thisStepsAtCycleN = this.getStepsAtCycleN(thisCycleMultiplier);
      } else {
        cycleMultiplier += Math.max(
          Math.floor((thisStepsAtCycleN - stepsAtCycleN) / cycle.getLength()),
          1,
        );
        stepsAtCycleN = cycle.getStepsAtCycleN(cycleMultiplier);
      }
    }
    console.log("cycle", {
      each: stepsAtCycleN,
      first: stepsAtCycleN,
      thisCycleMultiplier,
      cycleMultiplier,
    });
    return new Cycle(thisStepsAtCycleN, thisStepsAtCycleN);
  }
}

class Navigator {
  private stepsCount = 0;
  private ghosts: Ghost[];
  constructor(
    private readonly steps: Direction[],
    mapInput: string[],
  ) {
    const map = new Map(mapInput);
    this.ghosts = map
      .getPositionsEndingWith("A")
      .map((position) => new Ghost(position, map));
  }

  navigate() {
    const direction = this.steps[this.stepsCount % this.steps.length];
    this.ghosts.forEach((ghost) => ghost.navigate(direction, this.stepsCount));
  }

  run() {
    while (!this.ghosts.every((ghost) => ghost.hasCompletedCycle())) {
      this.navigate();
      this.stepsCount += 1;
    }

    const metaCycle = this.ghosts.reduce(
      (acc, ghost) => {
        return ghost.getCycle().joinWith(acc);
      },
      new Cycle(1, 0),
    );
    return metaCycle.getLength();
  }
}

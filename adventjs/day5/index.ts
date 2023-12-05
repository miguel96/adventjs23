export function cyberReindeer(road: string, time: number) {
  let roadArray = road.split("");
  let tickCount = 0;
  const ticks: string[] = [];
  let santaPosition = roadArray.findIndex((el) => el === "S");
  roadArray[santaPosition] = ".";

  const tick = () => {
    saveTick();
    tickCount += 1;
    if (tickCount === 5) {
      roadArray = roadArray.map((el) => (el === "|" ? "*" : el));
    }
    if (roadArray[santaPosition + 1] === "|") {
      return;
    }
    santaPosition += 1;
  };

  const saveTick = () => {
    const stepRoad = [...roadArray];
    stepRoad[santaPosition] = "S";
    ticks.push(stepRoad.join(""));
  };

  while (tickCount < time) {
    tick();
  }
  return ticks;
}

// WE cannot use classes in AdventJS event
export function cyberReindeerWithClass(road: string, time: number) {
  class Road {
    private road: string[];
    private time: number = 0;
    private santaPosition: number;
    private ticks: string[] = [];
    private tickCount: number = 0;
    constructor(
      road: string,
      private readonly totalTime: number,
    ) {
      const roadArray = road.split("");
      this.santaPosition = roadArray.findIndex((el) => el === "S");
      this.road = roadArray;
      this.road[this.santaPosition] = ".";
    }
    private tick() {
      this.saveTick();
      this.tickCount += 1;
      if (this.tickCount === 5) {
        this.road = this.road.map((el) => (el === "|" ? "*" : el));
      }
      if (this.road[this.santaPosition + 1] === "|") {
        return;
      }
      this.santaPosition += 1;
    }
    private saveTick() {
      const road = [...this.road];
      road[this.santaPosition] = "S";
      this.ticks.push(road.join(""));
    }

    run() {
      let timeIndex = 0;
      while (timeIndex <= this.totalTime) {
        this.tick();
        timeIndex += 1;
      }
      return this.ticks;
    }
  }

  // Code here
  return new Road(road, time).run();
}

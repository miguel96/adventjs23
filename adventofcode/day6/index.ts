export const getValidOptions = (races: string) => {
  return new RaceManager(races).run();
};

export const getValidOptions2 = (races: string) => {
  const parser = (races: string): Race[] => {
    const [timesToParse, distancesToParse] = races.split("\n");
    const parseEntry = (input: string) => {
      return Number(input.replace(/ /g, ""));
    };
    const times = parseEntry(timesToParse);
    const distances = parseEntry(distancesToParse);
    return [new Race(times, distances)];
  };
  return new RaceManager(races, parser).run();
};

class Race {
  constructor(
    private readonly time: number,
    private readonly distance: number,
  ) {}

  getValidOptions() {
    let i = 0;
    const validOptions: number[] = [];
    while (i < this.time) {
      if (this.isValid(i)) {
        validOptions.push(i);
      }
      i += 1;
    }
    return validOptions.length;
  }

  private isValid(startTime: number) {
    const moveTime = this.time - startTime;
    const distance = moveTime * startTime;
    return distance > this.distance;
  }
}

const parseRaces = (races: string): Race[] => {
  const [timesToParse, distancesToParse] = races.split("\n");
  const parseEntry = (input: string) => {
    return input
      .split(" ")
      .filter(Boolean)
      .map((el) => Number(el));
  };
  const times = parseEntry(timesToParse);
  const distances = parseEntry(distancesToParse);
  return times.map((time, i) => {
    const distance = distances[i];
    return new Race(time, distance);
  });
};

class RaceManager {
  private races: Race[];
  constructor(races: string, parser: (races: string) => Race[] = parseRaces) {
    this.races = parser(races);
  }

  run() {
    return this.races
      .map((race) => race.getValidOptions())
      .reduce((acc, el) => acc * el, 1);
  }
}

import { getValidOptions, getValidOptions2 } from "./index";

class RacesBuilder {
  private races: { distance: number; time: number }[] = [];

  withRace(race: { time: number; distance: number }) {
    this.races.push(race);
    return this;
  }
  build() {
    const times = this.races.map((race) => race.time);
    const distances = this.races.map((race) => race.distance);
    return `${times.join("  ")}\n${distances.join(" ")}`;
  }
}

describe("getValidOptions", () => {
  it("given a 7 time race with 9 distance should return 4 valid options", () => {
    const races = new RacesBuilder().withRace({ time: 7, distance: 9 }).build();
    expect(getValidOptions(races)).toBe(4);
  });
  it("given 3 races like in example should return the correct value", () => {
    const races = new RacesBuilder()
      .withRace({ distance: 9, time: 7 })
      .withRace({ distance: 40, time: 15 })
      .withRace({ distance: 200, time: 30 })
      .build();
    expect(getValidOptions(races)).toBe(288);
  });
  it("test real case", () => {
    const races = new RacesBuilder()
      .withRace({ distance: 564, time: 56 })
      .withRace({ distance: 1927, time: 97 })
      .withRace({ distance: 1131, time: 78 })
      .withRace({ distance: 1139, time: 75 })
      .build();
    expect(getValidOptions(races)).toBeGreaterThan(0);
  });

  it("test very large scenario", () => {
    const races = new RacesBuilder()
      .withRace({ time: 71530, distance: 940200 })
      .build();
    expect(getValidOptions(races)).toBe(71503);
  });

  it("getValidOptions2 should group races", () => {
    const races = new RacesBuilder()
      .withRace({ distance: 940200, time: 71530 })
      .build();
    const smallRaces = new RacesBuilder()
      .withRace({ distance: 9, time: 7 })
      .withRace({ distance: 40, time: 15 })
      .withRace({ distance: 200, time: 30 })
      .build();
    expect(getValidOptions(races)).toBe(getValidOptions2(smallRaces));
  });
});

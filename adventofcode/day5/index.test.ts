import { getLowersLocation, runFromEnd } from "./index";
type Category = [source: number, destination: number, range: number];
class CategoryBuilder {
  private source: number = 0;
  private destination: number = 0;
  private range: number = 0;
  withSource(source: number) {
    this.source = source;
    return this;
  }
  withDestination(destination: number) {
    this.destination = destination;
    return this;
  }

  withRange(range: number) {
    this.range = range;
    return this;
  }
  build(): Category {
    return [this.destination, this.source, this.range];
  }
}

class AlmanacBuilder {
  private seeds: number[] = [];
  private soil: Category[] = [];
  private fertilizer: Category[] = [];
  private water: Category[] = [];
  private light: Category[] = [];
  private temperature: Category[] = [];
  private humidity: Category[] = [];
  private location: Category[] = [];

  withSeeds(seeds: number[]) {
    this.seeds = seeds;
    return this;
  }
  withSoils(soil: Category[]) {
    this.soil = soil;
    return this;
  }
  withFertilizer(fertilizer: Category[]) {
    this.fertilizer = fertilizer;
    return this;
  }
  withWater(water: Category[]) {
    this.water = water;
    return this;
  }

  withLight(light: Category[]) {
    this.light = light;
    return this;
  }

  withTemperature(temperature: Category[]) {
    this.temperature = temperature;
    return this;
  }

  withHumidity(humidity: Category[]) {
    this.humidity = humidity;
    return this;
  }

  withLocation(location: Category[]) {
    this.location = location;
    return this;
  }

  private getCategoryString(
    source: string,
    destiny: string,
    items: Category[],
  ): string {
    return `${source}-to-${destiny} map:\n${items
      .map((item) => item.join(" "))
      .join("\n")}`;
  }
  build() {
    const seeds = `seeds: ${this.seeds.join(" ")}`;
    const soil = this.getCategoryString("seed", "soil", this.soil);
    const fertilizer = this.getCategoryString(
      "soil",
      "fertilizer",
      this.fertilizer,
    );
    const water = this.getCategoryString("fertilizer", "water", this.water);
    const light = this.getCategoryString("water", "light", this.light);
    const temperature = this.getCategoryString(
      "light",
      "temperature",
      this.temperature,
    );
    const humidity = this.getCategoryString(
      "temperature",
      "humidity",
      this.humidity,
    );
    const location = this.getCategoryString(
      "humidity",
      "location",
      this.location,
    );
    return [
      seeds,
      soil,
      fertilizer,
      water,
      light,
      temperature,
      humidity,
      location,
    ].join("\n\n");
  }
}

describe("getLowersLocation", () => {
  it("given only one option should return that", () => {
    const almanac = new AlmanacBuilder()
      .withSeeds([10])
      .withSoils([
        new CategoryBuilder()
          .withSource(10)
          .withDestination(11)
          .withRange(1)
          .build(),
      ])
      .withFertilizer([
        new CategoryBuilder()
          .withSource(11)
          .withDestination(12)
          .withRange(1)
          .build(),
      ])
      .withWater([
        new CategoryBuilder()
          .withSource(12)
          .withDestination(13)
          .withRange(1)
          .build(),
      ])
      .withLight([
        new CategoryBuilder()
          .withSource(13)
          .withDestination(14)
          .withRange(1)
          .build(),
      ])
      .withTemperature([
        new CategoryBuilder()
          .withSource(14)
          .withDestination(15)
          .withRange(1)
          .build(),
      ])
      .withHumidity([
        new CategoryBuilder()
          .withSource(15)
          .withDestination(16)
          .withRange(1)
          .build(),
      ])
      .withLocation([
        new CategoryBuilder()
          .withSource(16)
          .withDestination(17)
          .withRange(1)
          .build(),
      ])
      .build();
    expect(getLowersLocation(almanac)).toBe(17);
  });

  it("test example", () => {
    const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
    expect(getLowersLocation(input)).toBe(35);
  });
});

describe("runFromEnd", () => {
  it("should return first category valid", () => {
    const almanac = new AlmanacBuilder()
      .withSeeds([10])
      .withSoils([
        new CategoryBuilder()
          .withSource(10)
          .withDestination(11)
          .withRange(1)
          .build(),
      ])
      .withFertilizer([
        new CategoryBuilder()
          .withSource(11)
          .withDestination(12)
          .withRange(1)
          .build(),
      ])
      .withWater([
        new CategoryBuilder()
          .withSource(12)
          .withDestination(13)
          .withRange(1)
          .build(),
      ])
      .withLight([
        new CategoryBuilder()
          .withSource(13)
          .withDestination(14)
          .withRange(1)
          .build(),
      ])
      .withTemperature([
        new CategoryBuilder()
          .withSource(14)
          .withDestination(15)
          .withRange(1)
          .build(),
      ])
      .withHumidity([
        new CategoryBuilder()
          .withSource(15)
          .withDestination(16)
          .withRange(1)
          .build(),
      ])
      .withLocation([
        new CategoryBuilder()
          .withSource(16)
          .withDestination(17)
          .withRange(1)
          .build(),
      ])
      .build();
    expect(runFromEnd(almanac)).toStrictEqual({
      source: 10,
      range: 1,
      destiny: 11,
    });
  });
});

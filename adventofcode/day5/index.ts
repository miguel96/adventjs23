export const getLowersLocation = (almanac: string): number => {
  const almanacHandler = AlmanacHandler.build(almanac);

  return almanacHandler.run();
};

export const runFromEnd = (almanac: string) => {
  const almanacHandler = AlmanacHandler.build(almanac);

  return almanacHandler.getValidSeeds().toObject();
};
class Category {
  constructor(
    private readonly destiny: number,
    private readonly source: number,
    private readonly range: number,
  ) {}

  isValidFor(source: number) {
    const difference = source - this.source;

    return this.range > difference && 0 <= difference;
  }
  hasDestiny(destiny: number) {
    return destiny - this.destiny <= this.range;
  }

  getDestiny(source: number) {
    const difference = source - this.source;

    return this.destiny + difference;
  }

  getDestinyBase() {
    return this.destiny;
  }

  toObject() {
    return {
      source: 10,
      range: 1,
      destiny: 11,
    };
  }
}

type CategoryIndex =
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "location";

class AlmanacHandler {
  private seeds: number[];
  private static readonly categoryIndexes: CategoryIndex[] = [
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location",
  ];
  private categories: Record<CategoryIndex, Category[]>;
  private constructor(
    seeds: number[],
    categories: Record<CategoryIndex, Category[]>,
  ) {
    this.seeds = seeds;
    this.categories = categories;
  }

  run(): number {
    const seed = this.seeds[0];
    return Math.min(...this.seeds.map((seed) => this.runSeed(seed)));
  }

  getValidSeeds() {
    return this.runFromEnd();
  }

  static build(almanac: string) {
    const seeds = almanac
      .split("\n")[0]
      .replace("seeds: ", "")
      .split(" ")
      .filter(Boolean)
      .map((el) => Number(el));
    const entries = almanac.split("\n\n").slice(1);
    const categories: Record<CategoryIndex, Category[]> = Object.fromEntries(
      this.categoryIndexes.map((category, index) => {
        const options = entries[index]
          .split("\n")
          .slice(1)
          .map(
            (el) =>
              new Category(
                ...(el.split(" ").map((el) => Number(el)) as [
                  number,
                  number,
                  number,
                ]),
              ),
          );
        return [category, options as Category[]];
      }),
    ) as Record<CategoryIndex, Category[]>;
    return new AlmanacHandler(seeds, categories);
  }

  private getValidSources(category: string) {
    const reversedCategories = [...AlmanacHandler.categoryIndexes].reverse();
    const startCategoryIndex = reversedCategories.findIndex(
      (el) => el === category,
    );
    if (startCategoryIndex === -1) {
      throw new Error("INVALID_CATEGORY");
    }
    const lastIndex = reversedCategories.slice(startCategoryIndex)[0];
    const nextCategory = reversedCategories.slice(startCategoryIndex)[1];
    if (!nextCategory) {
      return { nextCategory: null, validSources: [] };
    }

    const toCheck = this.categories[lastIndex];
    const firstOption = toCheck.sort(
      (a, b) => a.getDestinyBase() - b.getDestinyBase(),
    )[0];
    const validSources = this.categories[nextCategory].filter((a) =>
      a.hasDestiny(firstOption.getDestinyBase()),
    );
    return { validSources, nextCategory };
  }

  private runFromEnd(startCategory = "location", resp?: Category): Category {
    const { validSources, nextCategory } = this.getValidSources(startCategory);
    if (!nextCategory) {
      if (!resp) {
        throw Error("INVALID_CATEGORY_CONFIG");
      }
      return resp;
    }
    let i = 0;
    while (i < validSources.length) {
      const validCategory = validSources[i];
      const resp1 = this.runFromEnd(nextCategory, resp);
      i += 1;
      if (resp1) {
        return resp1;
      }
    }
    throw new Error("invalid_way");
  }

  private runSeed(seed: number) {
    const resp = AlmanacHandler.categoryIndexes.reduce(
      (acc, categoryIndex, index) => {
        const source = acc[acc.length - 1];
        const categories = this.categories[categoryIndex];
        const nextCategory = categories.find((category) =>
          category.isValidFor(source),
        );
        if (!nextCategory) {
          return [...acc, source];
        }
        return [...acc, nextCategory.getDestiny(source)];
      },
      [seed],
    );
    return resp[resp.length - 1];
  }
}

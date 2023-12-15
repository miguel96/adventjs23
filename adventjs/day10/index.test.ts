import { createChristmasTree } from "./index";

describe("createChristmasTree", () => {
  it("create a basic tree with height 0 returns a |", () => {
    expect(createChristmasTree("*", 0)).toBe("|\n");
  });

  it("create a basic christmas tree with height 1 returns the first symbol", () => {
    expect(createChristmasTree("*", 1)).toBe("*\n|\n");
  });

  it("create a basic christmas tree with height 2 returns a well formed tree", () => {
    const solution = createChristmasTree("*", 2);
    expect(solution).toBe(" *\n* *\n |\n");
  });

  it("create a christmas tree with two ornaments height 2 returns a well formed tree", () => {
    const solution = createChristmasTree("12", 2);
    expect(solution).toBe(" 1\n2 1\n |\n");
  });

  it("create a christmas tree with three ornaments height 3 returns a well formed tree", () => {
    const solution = createChristmasTree("123", 3);
    console.log(solution);
    expect(solution).toBe("  1\n 2 3\n1 2 3\n  |\n");
  });
});

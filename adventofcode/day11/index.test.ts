import { getShortestPaths } from "./index";

describe("getShortestPaths", () => {
  it("given two adjacent galaxies should return 1", () => {
    expect(getShortestPaths("##")).toBe(1);
  });
  it("given three adjacent galaxies should return 4", () => {
    expect(getShortestPaths("###")).toBe(4);
  });

  it("given two galaxies with an space should return 3 (after expansion)", () => {
    expect(getShortestPaths("#.#")).toBe(3);
  });

  it("given two galaxies in vertical with an space should return 3 (after expansion)", () => {
    expect(getShortestPaths("#\n.\n#")).toBe(3);
  });

  it("given three galaxies with space", () => {
    expect(getShortestPaths("#\n.\n#\n.\n#")).toBe(12);
  });
  it("larger row", () => {
    expect(getShortestPaths("#...\n...#")).toBe(6);
  });

  it("use case", () => {
    const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.replace("\n", "");
    expect(getShortestPaths(input)).toBe(374);
  });

  it("use case phase 2", () => {
    const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.replace("\n", "");
    expect(getShortestPaths(input, 10)).toBe(1030);
  });

  it("use case phase 3", () => {
    const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.replace("\n", "");
    expect(getShortestPaths(input, 100)).toBe(8410);
  });
});

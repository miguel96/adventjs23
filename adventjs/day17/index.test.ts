import { optimizeIntervals } from "./index";

describe("optimizeIntervals", () => {
  it("given a simple interval should return it", () => {
    expect(optimizeIntervals([[1, 3]])).toStrictEqual([[1, 3]]);
  });

  it("given two overridden interval should return grouped", () => {
    expect(
      optimizeIntervals([
        [1, 7],
        [2, 5],
      ]),
    ).toStrictEqual([[1, 7]]);
  });

  it("given two not overridden interval should return both", () => {
    expect(
      optimizeIntervals([
        [1, 2],
        [3, 5],
      ]),
    ).toStrictEqual([
      [1, 2],
      [3, 5],
    ]);
  });

  it("special case", () => {
    expect(
      optimizeIntervals([
        [5, 8],
        [2, 6],
        [7, 17],
      ]),
    ).toStrictEqual([[2, 17]]);
  });
});

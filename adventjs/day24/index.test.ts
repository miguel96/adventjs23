import { getStaircasePaths } from "./index";

describe("getStaircasePaths", () => {
  it("base case, given 1 step and 1 maxJump response is one", () => {
    expect(getStaircasePaths(1, 1)).toStrictEqual([[1]]);
  });

  it("given 2 steps and 1 maxJump response is one, one", () => {
    expect(getStaircasePaths(2, 1)).toStrictEqual([[1, 1]]);
  });
  it("given 2 steps and 2 maxJump response is one, one or 2", () => {
    expect(getStaircasePaths(2, 2)).toStrictEqual([[1, 1], [2]]);
  });

  it("given several options sorts by steps", () => {
    expect(getStaircasePaths(5, 2)).toStrictEqual([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 2],
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 2, 2],
      [2, 1, 1, 1],
      [2, 1, 2],
      [2, 2, 1],
    ]);
  });
});

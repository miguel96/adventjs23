import { findBalancedSegment } from "./index";

describe("findBalancedSegment", () => {
  it("all the string matches", () => {
    expect(findBalancedSegment([1, 0])).toStrictEqual([0, 1]);
  });
  it("all the string matches except last character", () => {
    expect(findBalancedSegment([1, 0, 0])).toStrictEqual([0, 1]);
  });

  it("all the string matches except first character", () => {
    expect(findBalancedSegment([0, 0, 1])).toStrictEqual([1, 2]);
  });

  it("prioritizes first appearance", () => {
    expect(findBalancedSegment([1, 0, 1])).toStrictEqual([0, 1]);
  });
});

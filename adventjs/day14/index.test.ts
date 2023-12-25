import { maxGifts } from "./index";

describe("maxGifts", () => {
  it("given only one gift returns it", () => {
    expect(maxGifts([1])).toBe(1);
  });

  it("given two gifts returns the maximum", () => {
    expect(maxGifts([1, 3])).toBe(3);
  });
  it("maxGifts([2, 4, 2]) // 4 (4)", () => {
    expect(maxGifts([2, 4, 2])).toBe(4);
  });
  it("maxGifts([5, 1, 1, 5]) // 10 (5 + 5)", () => {
    expect(maxGifts([5, 1, 1, 5])).toBe(10);
  });
  it("maxGifts([4, 1, 1, 4, 2, 1]) // 9 (4 + 4 + 1)", () => {
    expect(maxGifts([4, 1, 1, 4, 2, 1])).toBe(9);
  });
  it("maxGifts([1, 3, 1, 3, 100]) // 103 (3 + 100)", () => {
    expect(maxGifts([1, 3, 1, 3, 100])).toBe(103);
  });
});

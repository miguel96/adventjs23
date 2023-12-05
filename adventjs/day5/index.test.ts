import { cyberReindeer } from "./index";

describe("cyberReindeer", () => {
  it("given a road with time 0 should return the initial status only", () => {
    expect(cyberReindeer(".S..", 1)).toStrictEqual([".S.."]);
  });
  it("given a road with three points santa keeps going", () => {
    expect(cyberReindeer(".S..", 2)).toStrictEqual([".S..", "..S."]);
  });

  it("given a road with a barrier santa should pass it until tick 5", () => {
    expect(cyberReindeer(".S|.", 5)).toStrictEqual([
      ".S|.",
      ".S|.",
      ".S|.",
      ".S|.",
      ".S|.",
    ]);
  });
  it("barriers should dissapear passed tick 5", () => {
    expect(cyberReindeer(".S|.", 7)).toStrictEqual([
      ".S|.",
      ".S|.",
      ".S|.",
      ".S|.",
      ".S|.",
      "..S.",
      "..*S",
    ]);
  });
});

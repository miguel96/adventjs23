import { getSteps } from "./index";

describe("getSteps", () => {
  it("given basic example should take two steps", () => {
    const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
    expect(getSteps(input)).toBe(2);
  });

  it("given a more complicated example should take 6 steps", () => {
    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
    expect(getSteps(input)).toBe(6);
  });

  describe("ghost navigation", () => {
    it("should navigate all ghost at the same time", () => {
      const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
      expect(getSteps(input)).toBe(6);
    });
  });
});

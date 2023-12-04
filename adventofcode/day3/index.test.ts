import { getGearRations, getPartNumberSum } from "./index";

describe("getPartNumberSum", () => {
  it("1st example", () => {
    const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
    expect(getPartNumberSum(input)).toBe(4361);
  });
  it("given no numbers result should be 0", () => {
    expect(getPartNumberSum("")).toBe(0);
  });
  it("given a number with a symbol on his right should consider part", () => {
    expect(getPartNumberSum("1*")).toBe(1);
  });
  it("given a number with a symbol on his left should consider part", () => {
    expect(getPartNumberSum("*1")).toBe(1);
  });
  it("given a number without a symbol should not consider part", () => {
    expect(getPartNumberSum("1.")).toBe(0);
  });
  it("given a number with three digits and a symbol on his right should consider part", () => {
    expect(getPartNumberSum("123*")).toBe(123);
  });
});

describe("getGearRatio", () => {
  it("given 1*1 should return 1", () => {
    expect(getGearRations("1*1")).toBe(1);
  });
  it("given .1.\n1*1 should return 0", () => {
    expect(getGearRations(".1.\n1*1")).toBe(0);
  });
  it("given ...\n3*2 should return 6", () => {
    expect(getGearRations("...\n3*2")).toBe(6);
  });
  it("given ....\n33*2 should return 6", () => {
    expect(getGearRations("....\n33*2")).toBe(66);
  });
  it("given two numbers with two digits with a gear should return the multiple", () => {
    const input = "11.\n*11";
    expect(getGearRations(input)).toBe(121);
  });
  it(`handles two numbers with a gear`, () => {
    const input = `467..114..
                            ...*......
                            ..35..633.
                            `.replace(/ /g, "");
    expect(getGearRations(input)).toBe(467 * 35);
  });
  it(`use case`, () => {
    const input = `467..114..
                            ...*......
                            ..35..633.
                            ......#...
                            617*......
                            .....+.58.
                            ..592.....
                            ......755.
                            ...$.*....
                            .664.598..`.replace(/ /g, "");
    expect(getGearRations(input)).toBe(467835);
  });
});

import { getNextValue, getPrevValue } from "./index";

describe("getNextValue", () => {
  it("given 1 2 3 returns 4", () => {
    expect(getNextValue("1 2 3")).toBe(4);
  });

  it("given 2 4 6 8 returns 10", () => {
    expect(getNextValue("2 4 6 8")).toBe(10);
  });

  it("given 1   3   6  10  15  21 returns 28", () => {
    expect(getNextValue("1   3   6  10  15  21")).toBe(28);
  });

  it("given 10  13  16  21  30  45 returns 68", () => {
    expect(getNextValue("10  13  16  21  30  45")).toBe(68);
  });

  describe("getPrevValue", () => {
    it("given 10  13  16  21  30  45 returns 5", () => {
      expect(getPrevValue("10  13  16  21  30  45")).toBe(5);
    });
  });
});

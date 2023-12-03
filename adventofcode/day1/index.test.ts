import { recoverCalibrator } from "./index";

describe("day1", () => {
  it("given 1abc2 should return 12", () => {
    expect(recoverCalibrator("1abc2")).toBe("12");
  });

  it("given pqr3stu8vwx should return 38", () => {
    expect(recoverCalibrator("pqr3stu8vwx")).toBe("38");
  });
  it("given a1b2c3d4e5f should return 15", () => {
    expect(recoverCalibrator("a1b2c3d4e5f")).toBe("15");
  });
  it("given treb7uchet should return 77", () => {
    expect(recoverCalibrator("treb7uchet")).toBe("77");
  });
  describe("written numbers", () => {
    it("given eighttwo should return 82", () => {
      expect(recoverCalibrator("eightwo")).toBe("82");
    });
    it("given two1nine should return 29", () => {
      expect(recoverCalibrator("two1nine")).toBe("29");
    });
    it("eightwothree 83", () => {
      expect(recoverCalibrator("eightwothree")).toBe("83");
    });
    it("given 4nineeightseven2 should return 42", () => {
      expect(recoverCalibrator("4nineeightseven2")).toBe("42");
    });
    it("given abcone2threexyz should return 13", () => {
      expect(recoverCalibrator("abcone2threexyz")).toBe("13");
    });
    it("given xtwone3four should return 24", () => {
      expect(recoverCalibrator("xtwone3four")).toBe("24");
    });
    it("given zoneight234 should return 14", () => {
      expect(recoverCalibrator("zoneight234")).toBe("14");
    });
    it("given 7pqrstsixteen should return 76", () => {
      expect(recoverCalibrator("7pqrstsixteen")).toBe("76");
    });
  });
});

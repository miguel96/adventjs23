import { calculateTime } from "./index";

describe("calculateTime", () => {
  it("given no deliveries returns 07:00:00", () => {
    expect(calculateTime([])).toBe("-07:00:00");
  });

  it("given a one hour delivery returns -06:00:00", () => {
    expect(calculateTime(["01:00:00"])).toBe("-06:00:00");
  });

  it("given one hour, one minute, one seconds delivery returns -5:58:59", () => {
    expect(calculateTime(["01:01:01"])).toBe("-05:58:59");
  });
});

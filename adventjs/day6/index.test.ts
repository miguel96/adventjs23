import { maxDistance } from "./index";

describe("maxDistance", () => {
  it("given only one step right returns 1", () => {
    expect(maxDistance(">")).toBe(1);
  });
  it("given only one step left returns 1", () => {
    expect(maxDistance("<")).toBe(1);
  });
  it("given one step right and one left returns 0 ", () => {
    expect(maxDistance("><")).toBe(0);
  });
  it("given one step right and one optional returns 2 ", () => {
    expect(maxDistance(">*")).toBe(2);
  });
});

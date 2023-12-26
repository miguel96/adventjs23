import { travelDistance } from "./index";

describe("travelDistance", () => {
  it("should handle horizontal right distance with 1 item", () => {
    expect(travelDistance("S...1")).toBe(4);
  });
  it("should handle horizontal left distance with 1 item", () => {
    expect(travelDistance("1....S")).toBe(5);
  });
  it("should handle vertical top distance with 1 item", () => {
    expect(travelDistance("S\n\n\n1")).toBe(3);
  });
  it("should handle vertical bottom distance with 1 item", () => {
    expect(travelDistance("1\n\n\nS")).toBe(3);
  });
});

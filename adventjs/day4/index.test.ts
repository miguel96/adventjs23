import { decode } from "./index";

describe("decode", () => {
  it("give one string without inversions should return as passed", () => {
    expect(decode("test")).toBe("test");
  });
  it("given one string containing inversions should return inverted", () => {
    expect(decode("hola (odnum)")).toBe("hola mundo");
  });
  it("given one string containing nested inversions should return inverted", () => {
    expect(decode("sa(u(cla)atn)s")).toBe("santaclaus");
  });
});

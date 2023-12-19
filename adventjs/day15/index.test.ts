import { autonomousDrive } from "./index";

describe("autonomousDrive", () => {
  it("with 0 movements should return the original store", () => {
    const store = ["!"];
    expect(autonomousDrive(store, [])).toStrictEqual(["!"]);
  });

  it("should handle right movements", () => {
    const store = ["!."];
    expect(autonomousDrive(store, ["R"])).toStrictEqual([".!"]);
  });
  it("should pass right walls", () => {
    const store = ["!."];
    expect(autonomousDrive(store, ["R", "R"])).toStrictEqual([".!"]);
  });
  it("should handle left movements without pass walls", () => {
    const store = [".!"];
    expect(autonomousDrive(store, ["L", "L"])).toStrictEqual(["!."]);
  });
  it("should handle down movements without pass walls", () => {
    const store = ["!", "."];
    expect(autonomousDrive(store, ["D", "D"])).toStrictEqual([".", "!"]);
  });
  it("should handle up movements without pass walls", () => {
    const store = [".", "!"];
    expect(autonomousDrive(store, ["U", "U"])).toStrictEqual(["!", "."]);
  });

  it("should enter into limits", () => {
    const store = [".*.", "*!*", ".*."];
    expect(autonomousDrive(store, ["R", "L", "U", "D", "R"])).toStrictEqual([
      ".*.",
      "*!*",
      ".*.",
    ]);
  });
});

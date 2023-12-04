import findNaughtyStep from "./index";

describe("findNaughtyStep", () => {
  it("if modified adds a character should return it", () => {
    expect(findNaughtyStep("abcd", "abcde")).toBe("e");
  });
  it("if original and modified are equal returns empty", () => {
    expect(findNaughtyStep("abcd", "abcd")).toBe("");
  });
  it("if modified removes a character should return it", () => {
    expect(findNaughtyStep("abcd", "abd")).toBe("c");
  });
});

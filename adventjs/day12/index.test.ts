import { checkIsValidCopy } from "./index";

describe("checkIsValidCopy", () => {
  it("Given two equal strings should return true", () => {
    expect(checkIsValidCopy("a", "a")).toBe(true);
  });
  it("mayus to minus is valid", () => {
    expect(checkIsValidCopy("A", "a")).toBe(true);
  });
  it("mins to mayus is not valid", () => {
    expect(checkIsValidCopy("a", "A")).toBe(false);
  });
  it("letter to # is valid", () => {
    expect(checkIsValidCopy("a", "#")).toBe(true);
    expect(checkIsValidCopy("##", "a")).toBe(false);
  });
  it("# to + is valid", () => {
    expect(checkIsValidCopy("aA#", "+++")).toBe(true);
    expect(checkIsValidCopy("+", "#")).toBe(false);
  });
  it("+ to : is valid", () => {
    expect(checkIsValidCopy("aA#+", "::::")).toBe(true);
    expect(checkIsValidCopy(":", "+")).toBe(false);
  });
  it(": to . is valid", () => {
    expect(checkIsValidCopy("aA#+:", ".....")).toBe(true);
    expect(checkIsValidCopy(".", ":")).toBe(false);
  });
  it(". to ' ' is valid", () => {
    expect(checkIsValidCopy("aA#.", "    ")).toBe(true);
    expect(checkIsValidCopy(" ", ".")).toBe(false);
  });
  it("letters does not degrade to different letter", () => {
    expect(checkIsValidCopy("A", "b")).toBe(false);
  });

  describe("use cases", () => {
    it("Santa Claus degrades to ###:. c:+##", () => {
      expect(checkIsValidCopy("Santa Claus", "###:. c:+##")).toBe(true);
    });
  });
});

import { compile } from "./index";

describe("compile", () => {
  it("on + add one to counter", () => {
    expect(compile("+++")).toBe(3);
  });
  it("on * multiplies counter per 2", () => {
    expect(compile("+**")).toBe(4);
  });
  it("on - substracts 1 to counter", () => {
    expect(compile("---")).toBe(-3);
  });

  describe("handles gotos with % and <", () => {
    it("back to % on <", () => {
      expect(compile("%+<")).toBe(2);
    });
    it("does nothing on < if no prev %", () => {
      expect(compile("<+%")).toBe(1);
    });

    it("backs to last seen % in <", () => {
      expect(compile("%+%+<")).toBe(3);
    });
  });
  describe("handles conditionals with ? and ¿", () => {
    it("not runs conditional if counter is less than 0", () => {
      expect(compile("-¿++++?")).toBe(-1);
    });
    it("not runs conditional if counter is 0", () => {
      expect(compile("+-¿++++?")).toBe(0);
    });
    it(" runs conditional if counter is less than 0", () => {
      expect(compile("+¿--?")).toBe(-1);
    });
  });
});

import { adjustLights } from "./index";
const aLights = (input: (0 | 1)[]) => {
  return input.map((el) => (el === 0 ? "🟢" : "🔴"));
};

describe("adjustLights", () => {
  it("given an array of one light returns 0", () => {
    expect(adjustLights(aLights([0]))).toBe(0);
  });

  it("given an array of two equal lights returns 1", () => {
    expect(adjustLights(aLights([0, 0]))).toBe(1);
  });

  it("given an array of three equal lights returns 1", () => {
    expect(adjustLights(aLights([0, 0, 0]))).toBe(1);
  });

  it("given an array of three equal lights returns 1", () => {
    expect(adjustLights(aLights([0, 0, 0]))).toBe(1);
  });

  describe("example cases", () => {
    it("first", () => {
      expect(adjustLights(aLights([0, 1, 0, 0, 0]))).toBe(1);
    });
    it("second", () => {
      expect(adjustLights(aLights([0, 0, 1, 1, 0]))).toBe(2);
    });

    it("third", () => {
      expect(adjustLights(aLights([0, 1, 0, 1, 0]))).toBe(0);
    });

    it("fourth", () => {
      expect(adjustLights(aLights([0, 0, 0]))).toBe(1);
    });

    it("fifth", () => {
      expect(adjustLights(aLights([0, 0, 1, 0, 1]))).toBe(1);
    });
  });
});

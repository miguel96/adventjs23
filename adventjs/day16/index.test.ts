import { transformTree } from "./index";

describe("transformTree", () => {
  it("tree with one node", () => {
    expect(transformTree([1])).toStrictEqual({
      value: 1,
      left: null,
      right: null,
    });
  });

  it("tree with three nodes", () => {
    expect(transformTree([1, 2, 3])).toStrictEqual({
      value: 1,
      left: {
        value: 2,
        right: null,
        left: null,
      },
      right: {
        value: 3,
        right: null,
        left: null,
      },
    });
  });

  it("tree with four nodes", () => {
    expect(transformTree([1, 2, 3, 4])).toStrictEqual({
      value: 1,
      left: {
        value: 2,
        right: null,
        left: {
          value: 4,
          left: null,
          right: null,
        },
      },
      right: {
        value: 3,
        right: null,
        left: null,
      },
    });
  });
  it("tree with four nodes and null", () => {
    expect(transformTree([1, 2, 3, null, 4])).toStrictEqual({
      value: 1,
      left: {
        value: 2,
        right: {
          value: 4,
          left: null,
          right: null,
        },
        left: null,
      },
      right: {
        value: 3,
        right: null,
        left: null,
      },
    });
  });

  it("empty tree", () => {
    expect(transformTree([])).toStrictEqual(null);
  });
  it("tree with 0", () => {
    expect(transformTree([0])).toStrictEqual({
      left: null,
      right: null,
      value: 0,
    });
  });
});

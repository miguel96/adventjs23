import { revealSabotage } from "./index";

describe("revealSabotage", () => {
  it("sabotaged gift, no empty fields", () => {
    expect(revealSabotage([["*"]])).toStrictEqual([["*"]]);
  });
  it("sabotaged gift, empty cell at right", () => {
    expect(revealSabotage([["*", " "]])).toStrictEqual([["*", "1"]]);
  });
  it("sabotaged gift, empty cell at right", () => {
    expect(revealSabotage([[" ", "*"]])).toStrictEqual([["1", "*"]]);
  });
  it("sabotaged gift, empty cell at bottom", () => {
    expect(revealSabotage([["*"], [" "]])).toStrictEqual([["*"], ["1"]]);
  });
  it("sabotaged gift, empty cell at top", () => {
    expect(revealSabotage([[" "], ["*"]])).toStrictEqual([["1"], ["*"]]);
  });
  it("sabotaged gifts empty cell in the middle", () => {
    expect(revealSabotage([["*", " ", "*"]])).toStrictEqual([["*", "2", "*"]]);
  });
  it("two sabotaged gifts", () => {
    expect(revealSabotage([["*", "*"]])).toStrictEqual([["*", "*"]]);
  });
});

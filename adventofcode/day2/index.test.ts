import { getGamePower, isPossibleGame } from "./index";

describe("day2", () => {
  const strings: { input: string; isPossible: boolean; id: number }[] = [
    {
      input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      id: 1,
      isPossible: true,
    },
  ];
  it.each(strings)("should return %isPossible for %input", (game) => {
    // expect(isPossibleGame(game.input)).toStrictEqual({id:game.id,isPossible:game.isPossible})
  });
  it("If there are more than 12 red should return not valid", () => {
    expect(isPossibleGame("Game 30: 13 red")).toStrictEqual({
      id: 30,
      isPossible: false,
    });
  });
  it("If there are more than 13 green should return not valid", () => {
    expect(isPossibleGame("Game 30: 14 green")).toStrictEqual({
      id: 30,
      isPossible: false,
    });
  });
  it("If there are more than 14 blue should return not valid", () => {
    expect(isPossibleGame("Game 30: 15 blue")).toStrictEqual({
      id: 30,
      isPossible: false,
    });
  });
  it("If there are one valid turn should return valid", () => {
    expect(isPossibleGame("Game 30: 12 red, 13 green, 14 blue")).toStrictEqual({
      id: 30,
      isPossible: true,
    });
  });
  it("If there are two valid turns should return valid", () => {
    expect(
      isPossibleGame(
        "Game 30: 12 red, 13 green, 14 blue; 12 red, 13 green, 14 blue",
      ),
    ).toStrictEqual({ id: 30, isPossible: true });
  });
});

describe("getGamePower", () => {
  it("given 1 blue 1 red 1 green should return 1", () => {
    expect(getGamePower("Game 20: 1 red, 1 blue, 1 green")).toBe(1);
  });
  it("given 2 blue 3 red and 1 green should return 6", () => {
    expect(getGamePower("Game 20: 3 red, 2 blue, 1 green")).toBe(6);
  });
});

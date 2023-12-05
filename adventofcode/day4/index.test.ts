import { getCardPoints, getCardPrizes, getInputsPrizes } from "./index";

describe("getCardPoints", () => {
  it("given a card with only one number winning should return 1 point", () => {
    const input = "Card   1: 69 12 75 19 83 56 73 53 52 91 | 69";
    expect(getCardPoints(input)).toBe(1);
  });
  it("given a card with two numbers winning should return 2 points", () => {
    const input = "Card   1: 69 12 75 19 83 56 73 53 52 91 | 69 12";
    expect(getCardPoints(input)).toBe(2);
  });
  it("given a card with three numbers winning should return 4 points", () => {
    const input = "Card   1: 69 12 75 19 83 56 73 53 52 91 | 69 12 75";
    expect(getCardPoints(input)).toBe(4);
  });
  it("given a card without numbers winning should return 0 points", () => {
    const input = "Card   1: 69 12 75 19 83 56 73 53 52 91 | 10 11 13";
    expect(getCardPoints(input)).toBe(0);
  });
});

describe("getCardPrizes", () => {
  it("given a card with only one number winning should return then next card", () => {
    const input = "Card   1: 69 12 75 19 83 56 73 53 52 91 | 69";
    expect(getCardPrizes(input)).toStrictEqual([2]);
  });
  it("given a card with two numbers winning should return the next 2 cards", () => {
    const input = "Card   2: 69 12 75 19 83 56 73 53 52 91 | 69 12";
    expect(getCardPrizes(input)).toStrictEqual([3, 4]);
  });
  it("given a card with three numbers winning should return the next 3 cards", () => {
    const input = "Card   10: 69 12 75 19 83 56 73 53 52 91 | 69 12 75";
    expect(getCardPrizes(input)).toStrictEqual([11, 12, 13]);
  });
  it("given a card without numbers winning should return 0 points", () => {
    const input = "Card   1: 69 12 75 19 83 56 73 53 52 91 | 10 11 13";
    expect(getCardPoints(input)).toBe(0);
  });
});

describe("Deck", () => {
  it("use case", () => {
    const inputs = [
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
      "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
      "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
      "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
      "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    ];
    expect(getInputsPrizes(inputs)).toBe(30);
  });
});

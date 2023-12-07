import { getHandsPrizes } from "./index";

class HandsBuilder {
  private hands: { cards: string; amount: number }[] = [];

  withHand(cards: string, amount: number) {
    this.hands.push({ cards, amount });
    return this;
  }
  build() {
    return this.hands.map((hand) => `${hand.cards} ${hand.amount}`).join("\n");
  }
}
describe("getHandsPrizes", () => {
  it("given one hand should return the same amount", () => {
    expect(
      getHandsPrizes(new HandsBuilder().withHand("AAAAA", 1).build()),
    ).toBe(1);
  });

  it("given two hands with the same value should return the amount * 3", () => {
    expect(
      getHandsPrizes(
        new HandsBuilder().withHand("AAAAA", 2).withHand("AAAAA", 2).build(),
      ),
    ).toBe(6);
  });

  it("should give bigger prizes to better hands by type", () => {
    expect(
      getHandsPrizes(
        new HandsBuilder()
          .withHand("AAAAA", 7)
          .withHand("TAAAA", 6)
          .withHand("QQAAA", 5)
          .withHand("KQAAA", 4)
          .withHand("TQTAA", 3)
          .withHand("AAKQT", 2)
          .withHand("AKQJT", 1)
          .build(),
      ),
    ).toBe(140);
  });

  it("if two hands has the same type the first different card should sort", () => {
    expect(
      getHandsPrizes(
        new HandsBuilder()
          .withHand("AAAAT", 6)
          .withHand("AAAAK", 4)
          .withHand("AAAAQ", 5)
          .build(),
      ),
    ).toBe(28);
  });

  it("test case", () => {
    expect(
      getHandsPrizes(
        new HandsBuilder()
          .withHand("32T3K", 765)
          .withHand("T55J5", 684)
          .withHand("KK677", 28)
          .withHand("KTJJT", 220)
          .withHand("QQQJA", 483)
          .build(),
      ),
    ).toBe(5905);
  });

  describe("With joker", () => {
    it("if two hands has the same type the first different card should sort", () => {
      expect(
        getHandsPrizes(
          new HandsBuilder()
            .withHand("TTTTT", 6)
            .withHand("JJJJJ", 4)
            .withHand("QQQQQ", 5)
            .build(),
        ),
      ).toBe(31);
    });

    it("should use the joker as the best card", () => {
      expect(
        getHandsPrizes(
          new HandsBuilder()
            .withHand("AAAAJ", 7)
            .withHand("KKKKK", 6)
            .withHand("JJJJJ", 5)
            .withHand("3JJ34", 4)
            .withHand("299TT", 3)
            .build(),
        ),
      ).toBe(3 + 4 * 2 + 5 * 3 + 6 * 4 + 7 * 5);
    });
  });
});

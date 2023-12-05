export const getCardPoints = (input: string) => {
  return Card.build(input).getValue();
};

export const getCardPrizes = (input: string) => {
  return Card.build(input).getPrizes();
};

export const getInputsPrizes = (inputs: string[]) => {
  return new Deck(inputs.map((input) => Card.build(input))).getPrizes();
};

class Deck {
  constructor(private cards: Card[]) {}
  getPrizes() {
    const totalCards: Record<number, number> = Object.fromEntries(
      this.cards.map((card) => [card.getNumber(), 1]),
    );
    this.cards.forEach((card) => {
      const cardNumber = card.getNumber();
      const prizes = card.getPrizes();
      const cardCounts = totalCards[cardNumber] || 0;
      prizes.forEach((cardNumberToAdd) => {
        totalCards[cardNumberToAdd] =
          (totalCards[cardNumberToAdd] || 0) + cardCounts;
      });
      console.log("totalCards after " + cardNumber, totalCards);
    });
    return Object.values(totalCards).reduce((acc, el) => acc + el, 0);
  }
}

class Card {
  private constructor(
    private readonly cardNumber: number,
    private readonly winningNumbers: number[],
    private readonly cardNumbers: number[],
  ) {}

  getNumber() {
    return this.cardNumber;
  }
  getValue() {
    return this.getPrizedNumbers().reduce((acc, el, i) => {
      return i === 0 ? 1 : acc * 2;
    }, 0);
  }

  getPrizes() {
    return this.getPrizedNumbers().map(
      (el, index) => index + 1 + this.cardNumber,
    );
  }

  private getPrizedNumbers() {
    return this.cardNumbers.filter((number) =>
      this.winningNumbers.includes(number),
    );
  }

  static build(input: string) {
    const [cardInfo, numbers] = input.split(":");
    const cardNumber = Number(cardInfo.replace("Card", ""));

    const [winningNumbersToParse, cardNumbersToParse] = numbers.split("|");
    const winningNumbers = winningNumbersToParse
      .split(" ")
      .filter(Boolean)
      .map((el) => Number(el));
    const cardNumbers = cardNumbersToParse
      .split(" ")
      .filter(Boolean)
      .map((el) => Number(el));
    return new Card(cardNumber, winningNumbers, cardNumbers);
  }
}

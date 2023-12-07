export const getHandsPrizes = (input: string) => {
  return input
    .split(/\n/g)
    .filter(Boolean)
    .map((el) => new Hand(el))
    .sort((a, b) => (a.isGreaterThan(b) ? 1 : -1))
    .map((el, i) => {
      console.log(el.toString() + (i + 1));
      return el;
    })
    .map((el) => el.getAmount())
    .reduce((acc, el, i) => acc + el * (i + 1), 0);
};

class Hand {
  private amount: number;
  private cards: string[];

  toString() {
    return `${this.cards.join("")} ${this.amount}`;
  }

  private readonly cardValues: Record<string, number> = {
    A: 12,
    K: 11,
    Q: 10,
    T: 9,
    "9": 8,
    "8": 7,
    "7": 6,
    "6": 5,
    "5": 4,
    "4": 3,
    "3": 2,
    "2": 1,
    J: 0,
  };
  constructor(input: string) {
    const [cardsToParse, amountToParse] = input.split(" ");
    this.cards = cardsToParse.split("");
    this.amount = Number(amountToParse);
  }

  getTypeIndex() {
    const { cardCombinations, jokers } = this.getCardCombinations();
    let [higherCardCombination = 0, secondCardCombination] = cardCombinations;
    higherCardCombination += jokers;
    if (higherCardCombination >= 5) {
      return 7;
    }

    if (higherCardCombination === 4) {
      return 6;
    }

    if (higherCardCombination === 3 && secondCardCombination === 2) {
      return 5;
    }

    if (higherCardCombination === 3) {
      return 4;
    }

    if (higherCardCombination === 2 && secondCardCombination === 2) {
      return 3;
    }

    if (higherCardCombination === 2) {
      return 2;
    }

    return 1;
  }

  private getCardCombinations() {
    const jokers = this.cards.filter((el) => el === "J").length;
    const cardCombinations = Object.values(
      this.cards
        .filter((el) => el !== "J")
        .reduce<Record<string, number>>((acc, card) => {
          acc[card] = (acc[card] || 0) + 1;
          return acc;
        }, {}),
    ).sort((a, b) => b - a);
    return { cardCombinations, jokers };
  }

  getAmount() {
    return this.amount;
  }
  isGreaterThan(hand: Hand) {
    const typeDifference = this.getTypeIndex() - hand.getTypeIndex();
    if (typeDifference) {
      return typeDifference > 0;
    }
    const differentIndex = this.cards.findIndex((card, index) => {
      return card !== hand.getCard(index);
    });

    if (differentIndex === -1) {
      return true;
    }
    return (
      this.getCardsDifference(
        this.getCard(differentIndex),
        hand.getCard(differentIndex),
      ) > 0
    );
  }

  private getCardsDifference(cardA: string, cardB: string) {
    return this.cardValues[cardA] - this.cardValues[cardB];
  }
  getCard(n: number) {
    return this.cards[n];
  }
}

export const getNextValue = (input: string) => {
  return new Oasis(
    input
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => Number(el)),
  ).getNext();
};

export const getPrevValue = (input: string) => {
  return new Oasis(
    input
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => Number(el)),
  ).getPrev();
};

export class Oasis {
  private sequences: number[][];
  constructor(input: number[]) {
    this.sequences = [input];
  }

  fillNextSequence() {
    let lastSequence = this.getLastSequence();
    const newSequence = lastSequence
      .map((el, index) => {
        const nextElement = lastSequence[index + 1];
        if (nextElement === undefined) {
          return undefined;
        }
        return nextElement - el;
      })
      .filter((el): el is number => el !== undefined);
    this.sequences.push(newSequence);
  }

  private getLastSequence() {
    return this.sequences[this.sequences.length - 1];
  }

  completeSequences() {
    while (this.getLastSequence().some((el) => el !== 0)) {
      this.fillNextSequence();
    }
  }

  getPrev() {
    this.completeSequences();
    return this.sequences.reduceRight((toAdd, sequence) => {
      return sequence[0] - toAdd;
    }, 0);
  }

  getNext() {
    this.completeSequences();
    return this.sequences.reduceRight((toAdd, sequence) => {
      return sequence[sequence.length - 1] + toAdd;
    }, 0);
  }
}

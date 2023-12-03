const writtenNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;
const replacers: Record<string, string> = Object.fromEntries(
  writtenNumbers.map((writtenNumber, index) => [writtenNumber, `${index + 1}`]),
);

export const recoverCalibrator = (inputToParse: string): string => {
  let input = inputToParse;
  let match = "first";
  while (match) {
    match = (input.match(/(one|two|three|four|five|six|seven|eight|nine)/) ||
      [])[1];
    if (match) {
      input = input.replace(match, replacers[match]);
    }
  }
  const [, first] = /([0-9])/.exec(input) || [];

  let secondInput = inputToParse;
  match = "first";
  const lastNumberRegExp =
    /.*(one|two|three|four|five|six|seven|eight|nine)(?!.*(?:one|two|three|four|five|six|seven|eight|nine))/;
  while (match) {
    match = (secondInput.match(lastNumberRegExp) || [])[1];
    if (match) {
      secondInput = secondInput.replace(lastNumberRegExp, replacers[match]);
    }
  }
  const [, second] =
    /([0-9])/.exec(secondInput.split("").reverse().join("")) || [];
  return `${first}${second}`;
};

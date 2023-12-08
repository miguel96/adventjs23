export function drawGift(size: number, symbol: string) {
  const testSymbol = "@";
  const border = "#";
  let index = 0;
  const lines: string[] = [];
  const borderLength = size * 2 - 1;
  if (size === 1) {
    return "#\n";
  }

  if (size === 2) {
    return " ##\n###\n##\n";
  }

  const testSymbolRegexp = new RegExp("\\" + testSymbol, "g");

  function reverseString(line: string) {
    return line.split("").reverse().join("");
  }

  function setCharAt(line: string, char: string, index: number) {
    return line.substring(0, index) + border + line.substring(index + 1);
  }

  function repeat(count: number, chart: string) {
    return count >= 0 ? chart.repeat(count) : "";
  }

  let middleLine = size - 1;
  while (index < size) {
    const lineNumber = index + 1;

    let blankSpaces = repeat(size - lineNumber, " ");
    let borderEnd = repeat(size + index - 2, testSymbol);
    let line = `${blankSpaces}${border}${borderEnd}${border}`;

    if (index === 0) {
      line = line.replace(testSymbolRegexp, border);
    }

    let reverseIndex = borderLength - lineNumber;
    lines[reverseIndex] = reverseString(line).replace(/ +$/, "");

    lines[reverseIndex] = setCharAt(lines[reverseIndex], border, middleLine);

    line = setCharAt(line, border, size * 2 - lineNumber - 1);

    lines[index] = line;

    index += 1;
  }
  if (size - 2 >= 0) {
    let testSymbolRegexp = new RegExp(("\\" + testSymbol).repeat(size - 2));
    let borderReplacer = border.repeat(size - 2);
    lines[middleLine] = lines[middleLine].replace(
      testSymbolRegexp,
      borderReplacer,
    );
  }

  return `${lines.join("\n")}\n`.replace(testSymbolRegexp, symbol);
}

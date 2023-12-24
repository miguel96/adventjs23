type Instruction = "+";
export function compile(code: string) {
  let index = 0;
  let result = 0;
  let goto: number | undefined;
  const instructions = code.split("");
  const returns: number[] = [];
  while (index < instructions.length) {
    switch (instructions[index]) {
      case "+":
        result += 1;
        break;
      case "*":
        result *= 2;
        break;
      case "-":
        result -= 1;
        break;
      case "%":
        goto = index;
        break;
      case "<":
        if (goto !== undefined && !returns.includes(index)) {
          returns.push(index);
          index = goto;
        }
        break;
      case "¿":
        if (result <= 0) {
          index =
            instructions.slice(index + 1).findIndex((el) => el === "?") + index;
        }
        break;
    }
    index += 1;
  }
  return result;
}

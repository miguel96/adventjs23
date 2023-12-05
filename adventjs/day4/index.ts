export function decode(message: string) {
  let bufferLevel: number = 0;
  const buffers: string[][] = [[]];

  message.split("").forEach((letter) => {
    if (letter === "(") {
      bufferLevel += 1;
      buffers[bufferLevel] = [];
    } else if (letter === ")") {
      const oldBuffer = buffers[bufferLevel].reverse();
      buffers[bufferLevel] = [];
      bufferLevel -= 1;
      buffers[bufferLevel].push(...oldBuffer);
    } else {
      buffers[bufferLevel].push(letter);
    }
  });
  // Code here
  return buffers[0].join("");
}

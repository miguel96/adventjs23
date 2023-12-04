function findNaughtyStep(original: string, modified: string) {
  const modifiedArray = modified.split("");
  const originalArray = original.split("");
  const maxLength = Math.max(modifiedArray.length, originalArray.length);
  let index = 0;
  while (index < maxLength) {
    if (modifiedArray[index] !== originalArray[index]) {
      if (originalArray[index + 1] === modifiedArray[index]) {
        return originalArray[index];
      } else {
        return modifiedArray[index];
      }
    }
    index += 1;
  }
  return "";
}

export default findNaughtyStep;

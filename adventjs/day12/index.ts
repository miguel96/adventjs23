export function checkIsValidCopy(original: string, copy: string) {
  function getDegradationStage(el: string) {
    const degradations = [
      " ",
      ".",
      ":",
      "+",
      "#",
      (el: string) => el.match(/[a-z]/),
      (el: string) => el.match(/[A-Z]/),
    ];
    const index = degradations.findIndex((deg) => {
      if (typeof deg === "function" && deg(el)) {
        return true;
      }
      return el === deg;
    });
    return index === -1 ? degradations.length : index;
  }
  function isDegradation(first: string, second: string) {
    const firstDegradation = getDegradationStage(first);
    const secondDegradation = getDegradationStage(second);
    if (firstDegradation < secondDegradation) {
      return false;
    }
    if (secondDegradation >= 5) {
      return first.toLowerCase() === second.toLowerCase();
    }
    return true;
  }
  const originalA = original.split("");
  const copyA = copy.split("");
  if (originalA.length !== copyA.length) {
    return false;
  }
  return originalA.every((el, i) => isDegradation(el, copyA[i]));
}

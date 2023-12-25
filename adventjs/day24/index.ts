export function getStaircasePaths(steps: number, maxJump: number) {
  if (steps == 0) {
    return [[]];
  }
  let options: number[][] = [];
  let i = 0;
  let completedOptions: number[][] = [];
  const getTotal = (opts: number[]) => opts.reduce((acc, el) => acc + el, 0);
  let possibleSteps: number[] = new Array(maxJump)
    .fill(0)
    .map((el, index) => index + 1);
  while (i < steps) {
    if (i === 0) {
      options = possibleSteps.map((possibleStep) => [possibleStep]);
      completedOptions.push(...options.filter((el) => getTotal(el) === steps));
      options = options.filter((opt) => getTotal(opt) < steps);
    } else {
      let newCandidates = options
        .map((opt): number[][] => {
          const newOpts = possibleSteps.map((possibleStep) => [
            ...opt,
            possibleStep,
          ]);
          return [...newOpts];
        })
        .flat();
      options = newCandidates.filter((opt) => getTotal(opt) < steps);
      completedOptions.push(
        ...newCandidates.filter((el) => getTotal(el) === steps),
      );
    }
    i += 1;
  }
  completedOptions.push(...options.filter((el) => getTotal(el) === steps));
  return completedOptions.sort((opta, optb) => {
    const differentIndex = opta.findIndex(
      (optael, index) => optael !== optb[index],
    );
    if (differentIndex === -1) {
      return opta.length - optb.length;
    }
    return opta[differentIndex] - optb[differentIndex];
  });
}

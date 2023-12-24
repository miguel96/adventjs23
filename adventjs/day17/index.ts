export function optimizeIntervals(intervals: [number, number][]) {
  let newIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
  const resp: [number, number][] = [];

  while (newIntervals.length) {
    let myInterval = newIntervals[0];
    let maxValue = myInterval[1];
    const lastIndex = newIntervals.findIndex((interval) => {
      const outOfInterval = interval[0] > maxValue;
      if (interval[1] > maxValue && !outOfInterval) {
        maxValue = interval[1];
      }
      return outOfInterval;
    });
    const intervalsGroup =
      lastIndex < 0 ? newIntervals : newIntervals.slice(0, lastIndex);
    newIntervals = lastIndex < 0 ? [] : newIntervals.slice(lastIndex);
    resp.push([
      Math.min(...intervalsGroup.map((el) => el[0])),
      Math.max(...intervalsGroup.map((el) => el[1])),
    ]);
  }
  return resp;
}

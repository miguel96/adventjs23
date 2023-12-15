export function adjustLights(lights: string[]) {
  const green = "🟢";
  const red = "🔴";

  const startingWithGreen: string[] = [];
  lights.forEach((_, i) => {
    const nextLight = i % 2 === 0 ? green : red;
    startingWithGreen.push(nextLight);
  });

  // Code here
  const opt1 = startingWithGreen.filter((el, i) => el !== lights[i]).length;
  const opt2 = startingWithGreen.filter((el, i) => el === lights[i]).length;
  return Math.min(opt1, opt2);
}

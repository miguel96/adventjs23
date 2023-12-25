export function maxGifts(houses: number[]) {
  if (houses.length === 0) {
    return 0;
  }

  if (houses.length === 1) {
    return houses[0];
  }

  const options: number[] = new Array(houses.length);
  options[0] = houses[0];
  options[1] = Math.max(houses[0], houses[1]);

  for (let i = 2; i < houses.length; i++) {
    options[i] = Math.max(options[i - 1], options[i - 2] + houses[i]);
  }

  return options[options.length - 1];
}

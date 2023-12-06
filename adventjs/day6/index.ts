export function maxDistance(movements: string) {
  const movementStore: Record<string, number> = {
    ">": 0,
    "<": 0,
    "*": 0,
  };
  for (let i = 0; i < movements.length; i++) {
    movementStore[movements[i]] += 1;
  }
  return Math.abs(movementStore[">"] - movementStore["<"]) + movementStore["*"];
}

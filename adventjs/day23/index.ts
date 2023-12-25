export function organizeChristmasDinner(dishes: string[][]) {
  const ingredients: Record<string, string[]> = {};
  dishes.forEach((dish) => {
    const [dishName, ...dishIngredients] = dish;
    dishIngredients.forEach((ing) => {
      if (!ingredients[ing]) {
        ingredients[ing] = [];
      }
      ingredients[ing].push(dishName);
    });
  });
  return Object.entries(ingredients)
    .filter(([ingredient, platos]) => platos.length > 1)
    .map(([ingredient, platos]) => [ingredient, ...platos.sort()])
    .sort();
}

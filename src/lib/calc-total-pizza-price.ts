import { Ingredient, ProductItem } from '@prisma/client';

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  size: number,
  type: number,
) => {
  const pizzaPrices = items.find((item) => item.pizzaType === type && item.size === size)?.price;
  const totalIngredientPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);

  return (pizzaPrices || 0) + totalIngredientPrice;
};

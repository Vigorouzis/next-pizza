import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  const totalPrice = calcTotalPizzaPrice(items, ingredients, selectedIngredients, size, type);
  return { textDetails, totalPrice };
};

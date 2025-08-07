import { PizzaSize, pizzaSizes, pizzaTypes } from '@/constants/pizza';
import { ProductItem } from '@prisma/client';

export const getAvailablePizzaSizes = (size: PizzaSize, items: ProductItem[]) => {
  const availablePizzaSizes = pizzaSizes.map((sizeItem) => ({
    name: sizeItem.name,
    value: sizeItem.value,
    disabled: false,
  }));

  const availablePizzasBySize = items.filter((item) => item.size === size);

  const availablePizzaTypes = pizzaTypes.map((typeItem) => ({
    name: typeItem.name,
    value: typeItem.value,
    disabled: !availablePizzasBySize.some(
      (pizza) => Number(pizza.pizzaType) === Number(typeItem.value),
    ),
  }));

  return [availablePizzaSizes, availablePizzaTypes] as const;
};

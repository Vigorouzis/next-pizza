import { Variant } from '@/components/shared/group-variants';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { getAvailablePizzaSizes } from '@/lib';
import { ProductItem } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  size: PizzaSize;
  setSize: (size: PizzaSize) => void;
  type: PizzaType;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredients: (id: number) => void;
  availablePizzaSizes: Variant[];
  availablePizzaTypes: Variant[];
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredients }] = useSet(new Set<number>());

  const [availablePizzaSizes, availablePizzaTypes] = getAvailablePizzaSizes(size, items);

  useEffect(() => {
    const currentType = availablePizzaTypes.find((t) => Number(t.value) === type);

    const isCurrentTypeDisabled = currentType?.disabled === true;

    if (isCurrentTypeDisabled) {
      const firstAvailableType = availablePizzaTypes.find((t) => !t.disabled);
      if (firstAvailableType) {
        setType(Number(firstAvailableType.value) as PizzaType);
      }
    }
  }, [size, availablePizzaTypes, type]);

  return {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    addIngredients,
    availablePizzaSizes,
    availablePizzaTypes,
  };
};

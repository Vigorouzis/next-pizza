'use client';

import { cn } from '@/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { ProductWithRelations } from '@/@types/prisma';
import { usePizzaOptions } from '@/hooks/use-pizza-options';
import { getPizzaDetails } from '@/lib';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductWithRelations['items'];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}) => {
  const {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    addIngredients,
    availablePizzaSizes,
    availablePizzaTypes,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredients,
    });
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="relative flex w-full flex-1 items-center justify-center">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>
      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="mt-5 flex flex-col gap-5">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={availablePizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredients(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
          onClick={handleClickAd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

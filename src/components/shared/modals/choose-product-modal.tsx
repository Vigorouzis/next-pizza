'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { Dialog } from '@/components/ui';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0',
          className,
        )}
      >
          <DialogTitle className='sr-only'>{product.name}</DialogTitle>
        
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};

'use client';

import { ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/lib';
import { useCartStore } from '@/store';
import { useEffect } from 'react';
import { PizzaSize, PizzaType } from '@/constants/pizza';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  useEffect(() => {
    void fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>

        <SheetContent className="flex flex-col justify-between bg-[#f4f1ee] pb-0">
          <SheetHeader className="font-bold">3 товара</SheetHeader>

          <div className="-mx-6 mt-5 flex-1 overflow-auto">
            <div className="mb-2">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaSize && item.type
                      ? getCartItemDetails(
                          item.type as PizzaType,
                          item.pizzaSize as PizzaSize,
                          item.ingredients,
                        )
                      : ''
                  }
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>
          <SheetFooter className="-mx-6 bg-white p-8">
            <div className="w-full">
              <div className="mb-4 flex">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200"></div>
                </span>

                <span className="text-lg font-bold">{totalAmount} ₽</span>
              </div>
              <Link href="/cart">
                <Button type="submit" className="h-12 w-full text-base">
                  Оформить заказ
                  <ArrowRight className="ml-2 w-5" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

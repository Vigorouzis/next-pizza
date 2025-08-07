import { CartItemDTO } from '@/services/dto/cart.dto';
import { ingredients } from '../../prisma/constants';

export const calcCartItemTotalAmount = (item: CartItemDTO):number => {
  const ingredientPrice = item.ingeredients.reduce((acc, item) => acc + item.price, 0);
  return (ingredientPrice + item.productItem.price) * item.quanity;
};

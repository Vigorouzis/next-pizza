import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma-client';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: body.quantity,
      },
    });

    
  } catch (error) {
    console.log('CART_PATCH] Server Error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

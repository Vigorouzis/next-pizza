import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma-client';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ tiems: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [ { token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingeredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error(error);
  }
}

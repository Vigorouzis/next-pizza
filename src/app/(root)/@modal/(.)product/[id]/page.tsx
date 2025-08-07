import { notFound } from 'next/navigation';
import { ChooseProductModal, Container, Title } from '@/components/shared';
import prisma from '../../../../../../prisma/prisma-client';

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: { ingredients: true, items: true },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}

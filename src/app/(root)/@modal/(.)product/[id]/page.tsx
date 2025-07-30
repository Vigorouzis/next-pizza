import { notFound } from "next/navigation";
import { ChooseProductModal, Container, Title } from "@/components/shared";
import { ProductImage } from "@/components/shared/product-image";
import { GroupVariants } from "@/components/shared/group-variants";
import prisma from "../../../../../../prisma/prisma-client";
import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";

export default async function ProductModalPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}

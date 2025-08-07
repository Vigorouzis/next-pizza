import { notFound } from 'next/navigation';
import prisma from '../../../../../prisma/prisma-client';
import { Container, Title } from '@/components/shared';
import { PizzaImage } from '@/components/shared/pizza-image';
import { GroupVariants } from '@/components/shared/group-variants';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="my-10 flex flex-col">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} className="" size={40} />
        <div className="w-[490px] bg-[#F7F6F5] p-7">
          <Title text={product.name} size="md" className="mb-1 font-extrabold" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex obcaecati voluptas tenetur
            amet odit. Tenetur facilis quis, alias porro animi odio aperiam quae eveniet ipsum
            adipisci in, consequuntur totam suscipit.
          </p>
          <GroupVariants
            value="2"
            items={[
              {
                name: 'Маленькая',
                value: '1',
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}

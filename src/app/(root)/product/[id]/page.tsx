  import { notFound } from "next/navigation";
  import prisma from "../../../../../prisma/prisma-client";
  import { Container, Title } from "@/components/shared";
  import { ProductImage } from "@/components/shared/product-image";
  import { GroupVariants } from "@/components/shared/group-variants";

  export default async function ProductPage({
    params,
  }: {
    params: { id: string };
  }) {
    const product = await prisma.product.findFirst({
      where: { id: Number(params.id) },
    });

    if (!product) {
      return notFound();
    }
    return (
      <Container className="flex flex-col my-10 ">
        <div className="flex flex-1">
          <ProductImage imageUrl={product.imageUrl} className="" size={40} />
          <div className="w-[490px] bg-[#F7F6F5] p-7">
            <Title
              text={product.name}
              size="md"
              className="font-extrabold mb-1"
            />
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              obcaecati voluptas tenetur amet odit. Tenetur facilis quis, alias
              porro animi odio aperiam quae eveniet ipsum adipisci in,
              consequuntur totam suscipit.
            </p>
            <GroupVariants
            selelectedValue="2"
              items={[
                {
                  name: "Маленькая",
                  value: "1",
                },
                {
                  name: "Средняя",
                  value: "2",
                },
                {
                  name: "Большая",
                  value: "3",
                },
              ]}
            />
          </div>
        </div>
      </Container>
    );
  }

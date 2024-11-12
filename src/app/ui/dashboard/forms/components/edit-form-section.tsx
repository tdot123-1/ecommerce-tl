import { notFound } from "next/navigation";
import Form from "../edit-product";
import { fetchOneProduct } from "@/lib/data/products/dashboard/data";

interface EditFormSectionProps {
  productId: string;
}

const EditFormSection = async ({ productId }: EditFormSectionProps) => {
  const product = await fetchOneProduct(productId);

  if (!product) notFound();

  return (
    <section>
      <Form product={product} />
    </section>
  );
};

export default EditFormSection;

import { notFound } from "next/navigation";
import EditImages from "./edit-images";
import { fetchOneProductImagesDashboard } from "@/lib/data/images/dashboard/data";

interface EditImagesSectionProps {
  productId: string;
}

const EditImagesSection = async ({ productId }: EditImagesSectionProps) => {
  const product = await fetchOneProductImagesDashboard(productId);

  if (!product) notFound();

  return (
    <section className="my-5">
      <EditImages
        name={product.product_name}
        image_url={product.product_image_url}
        productId={productId}
        images={product.additional_images}
      />
    </section>
  );
};

export default EditImagesSection;

import { fetchOneProductImages } from "@/lib/data";
import { notFound } from "next/navigation";
import EditImages from "./edit-images";

interface EditImagesSectionProps {
  productId: string;
}

const EditImagesSection = async ({ productId }: EditImagesSectionProps) => {
  const product = await fetchOneProductImages(productId);

  if (!product) notFound();

  return (
    <div>
      <EditImages
        name={product.product_name}
        image_url={product.product_image_url}
        productId={productId}
        images={product.additional_images}
      />
    </div>
  );
};

export default EditImagesSection;

import {
  fetchAllTags,
  fetchOneProductTagsDashboard,
} from "@/lib/data/tags/dashboard/data";
import EditTags from "./edit-tags";
import { notFound } from "next/navigation";

interface EditTagsSectionProps {
  productId: string;
}

const EditTagsSection = async ({ productId }: EditTagsSectionProps) => {
  const product = await fetchOneProductTagsDashboard(productId);
  const tags = await fetchAllTags();

  if (!product || !tags) notFound();

  return (
    <section>
      <EditTags
        productId={productId}
        name={product.name}
        imageUrl={product.image_url}
        productTags={product.tags}
        allTags={tags}
      />
    </section>
  );
};

export default EditTagsSection;

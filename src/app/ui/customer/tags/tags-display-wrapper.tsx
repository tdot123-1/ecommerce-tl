import { fetchAllActiveTags } from "@/lib/data/products/store/data";
import TagsDisplay from "./tags-display";

const TagsDisplayWrapper = async () => {
  const tags = await fetchAllActiveTags();
  return (
    <>
      <TagsDisplay tags={tags} />
    </>
  );
};

export default TagsDisplayWrapper;

import {
  fetchActiveTagsByCategory,
  fetchAllActiveTags,
} from "@/lib/data/tags/store/data";
import TagsDisplay from "./tags-display";

interface TagsDisplayWrapperProps {
  category?: string;
}

const TagsDisplayWrapper = async ({ category }: TagsDisplayWrapperProps) => {
  const tags = category
    ? await fetchActiveTagsByCategory(category)
    : await fetchAllActiveTags();

  return (
    <>
      <TagsDisplay tags={tags} />
    </>
  );
};

export default TagsDisplayWrapper;

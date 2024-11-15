import {
  fetchActiveTagsByCategory,
  fetchAllActiveTags,
} from "@/lib/data/tags/store/data";
import TagsDisplay from "./tags-display";

interface TagsDisplayWrapperProps {
  category?: string;
  urlTags?: string[];
}

const TagsDisplayWrapper = async ({ category, urlTags }: TagsDisplayWrapperProps) => {
  const tags = category
    ? await fetchActiveTagsByCategory(category)
    : await fetchAllActiveTags();

  return (
    <>
      <TagsDisplay tags={tags} urlTags={urlTags} />
    </>
  );
};

export default TagsDisplayWrapper;

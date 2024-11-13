"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TagCheckbox from "./tag-checkbox";
import { useState } from "react";

interface TagsDisplayContentProps {
  tags: string[];
}

const TagsDisplayContent = ({ tags }: TagsDisplayContentProps) => {
  const [allItemsChecked, setAllItemsChecked] = useState(true);
  const [checkedTags, setCheckedTags] = useState<string[]>([]);

  const handleAllItemsChange = () => {
    if (!allItemsChecked) {
      setCheckedTags([]);
    }
    setAllItemsChecked(!allItemsChecked);
  };

  const handleTagChange = (tag: string, isChecked: boolean) => {
    const updatedTags = isChecked
      ? [...checkedTags, tag]
      : checkedTags.filter((t) => t !== tag);

    setCheckedTags(updatedTags);

    setAllItemsChecked(updatedTags.length === 0);
  };

  return (
    <>
      <div className="grid grid-cols-4 my-1 w-1/3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="items-filter"
            checked={allItemsChecked}
            onChange={handleAllItemsChange}
          />
          <Label htmlFor="items-filter">All Items</Label>
        </div>
        {tags.map((tag) => (
          <TagCheckbox
            key={tag}
            tagName={tag}
            isChecked={checkedTags.includes(tag)}
            onChange={(isChecked) => handleTagChange(tag, isChecked)}
          />
        ))}
      </div>
    </>
  );
};

export default TagsDisplayContent;

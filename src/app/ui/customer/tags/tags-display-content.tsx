"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TagCheckbox from "./tag-checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, Trash2Icon } from "lucide-react";

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
      <div className="w-fit mt-2 ml-2">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
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
        <div className="w-fit mx-auto mt-2">
          <Button
            size={`sm`}
            variant={`secondary`}
            className="rounded-2xl mx-1"
          >
            <Trash2Icon size={20} />
            <p className="ml-1">Clear All</p>
          </Button>
          <Button size={`sm`} className="rounded-2xl mx-1">
            <SearchIcon size={20} />
            <p className="ml-1">Apply Tags</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default TagsDisplayContent;

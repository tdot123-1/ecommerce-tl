"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TagCheckbox from "./tag-checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, Trash2Icon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

interface TagsDisplayContentProps {
  tags: string[];
  urlTags?: string[];
}

const TagsDisplayContent = ({ tags, urlTags }: TagsDisplayContentProps) => {
  // keep track of 'all items' checkbox, uncheck when tags are selected
  const [allItemsChecked, setAllItemsChecked] = useState<boolean>(
    !urlTags?.length
  );

  // all checked tags
  const [checkedTags, setCheckedTags] = useState<string[]>(
    urlTags ? urlTags : []
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // create link from search params
  const createPageURL = (urlTags: string[] = []) => {
    const params = new URLSearchParams(searchParams);

    // turn array of checked tags into string, set in search params
    if (checkedTags.length > 0) {
      params.set("tags", urlTags.join("-"));
    } else {
      params.delete("tags");
    }

    // set page to 1, return url
    params.set("page", "1");

    return `${pathname}?${params.toString()}`;
  };

  // unselect all other tags if 'all items' is selected
  const handleAllItemsChange = () => {
    if (!allItemsChecked) {
      setCheckedTags([]);
    }
    setAllItemsChecked(!allItemsChecked);
  };

  // add/remove tag from checked tags
  const handleTagChange = (tag: string, isChecked: boolean) => {
    const updatedTags = isChecked
      ? [...checkedTags, tag]
      : checkedTags.filter((t) => t !== tag);

    setCheckedTags(updatedTags);

    setAllItemsChecked(updatedTags.length === 0);
  };

  // uncheck all tags
  const handleRemoveAllTags = () => {
    setCheckedTags([]);
    setAllItemsChecked(!allItemsChecked);
  };

  return (
    <>
      <div className="w-fit mt-2 ml-2">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="items-filter"
              checked={allItemsChecked}
              // onChange={handleAllItemsChange}
              onCheckedChange={handleAllItemsChange}
              disabled={checkedTags.length === 0}
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
          <Link
            href={createPageURL()}
            aria-disabled={checkedTags.length === 0}
            className="cursor-default"
          >
            <Button
              size={`sm`}
              variant={`secondary`}
              className="rounded-2xl mx-1"
              disabled={checkedTags.length === 0}
              onClick={handleRemoveAllTags}
            >
              <Trash2Icon size={20} />
              <p className="ml-1">Clear All</p>
            </Button>
          </Link>

          <Link
            href={createPageURL(checkedTags)}
            aria-disabled={checkedTags.length === 0}
            className="cursor-default"
          >
            <Button
              // disabled={checkedTags.length === 0}
              size={`sm`}
              className="rounded-2xl mx-1"
            >
              <SearchIcon size={20} />
              <p className="ml-1">Apply Tags</p>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TagsDisplayContent;

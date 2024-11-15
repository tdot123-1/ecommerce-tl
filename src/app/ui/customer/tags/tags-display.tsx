"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, TagIcon } from "lucide-react";
import TagsDisplayContent from "./tags-display-content";
import { useState } from "react";

interface TagsDisplayProps {
  tags: string[];
  urlTags?: string[];
}

const TagsDisplay = ({ tags, urlTags }: TagsDisplayProps) => {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <>
      <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
        <CollapsibleTrigger asChild>
          <Button variant={`outline`} className="mt-1">
            <div className="flex items-center gap-1">
              Tags <TagIcon size={20} />
              {collapsibleOpen ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <TagsDisplayContent tags={tags} urlTags={urlTags} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default TagsDisplay;

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TagIcon } from "lucide-react";
import TagsDisplayContent from "./tags-display-content";
import { fetchAllActiveTags } from "@/lib/data/products/store/data";

const TagsDisplay = async () => {
  const tags = await fetchAllActiveTags();

  return (
    <>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant={`outline`}>
            <div className="flex items-center gap-1">
              Tags <TagIcon size={20} />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <TagsDisplayContent tags={tags} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default TagsDisplay;

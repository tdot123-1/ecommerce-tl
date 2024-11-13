import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { fetchAllTags } from "@/lib/data/products/store/data";
import { FilterIcon, TagIcon } from "lucide-react";
import TagCheckbox from "./tag-checkbox";
import TagsDisplayContent from "./tags-display-content";

const TagsDisplay = async () => {
  const tags = await fetchAllTags();

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

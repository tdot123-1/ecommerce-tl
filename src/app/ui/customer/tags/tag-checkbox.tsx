import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TagCheckboxProps {
  tagName: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const TagCheckbox = ({ tagName, isChecked, onChange }: TagCheckboxProps) => {
  const handleChange = (checked: boolean) => {
    onChange(checked);
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`tag-${tagName}-filter`}
          onCheckedChange={handleChange}
          checked={isChecked}
        />
        <Label htmlFor={`tag-${tagName}-filter`}>{tagName}</Label>
      </div>
    </>
  );
};

export default TagCheckbox;

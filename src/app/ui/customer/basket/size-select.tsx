"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// get sizes and function to set selected size from parent component
interface SizeSelectProps {
  sizes: string;
  handleSizeSelect: (size: string) => void;
}

const SizeSelect = ({ sizes, handleSizeSelect }: SizeSelectProps) => {

  // split string of available sizes into arr
  const sizesArr = sizes.split(",");

  return (
    <Select onValueChange={handleSizeSelect}>
      <SelectTrigger aria-describedby="size-error">
        <SelectValue placeholder="Select size" />
      </SelectTrigger>
      <SelectContent>
        {sizesArr.map((size: string) => (
          <SelectItem key={size} value={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SizeSelect;

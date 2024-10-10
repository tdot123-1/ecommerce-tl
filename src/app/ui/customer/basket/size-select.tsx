"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SizeSelectProps {
  sizes: string;
  handleSizeSelect: (size: string) => void;
}

const SizeSelect = ({ sizes, handleSizeSelect }: SizeSelectProps) => {
  const sizesArr = sizes.split(",");

  return (
    <Select onValueChange={handleSizeSelect}>
      <SelectTrigger>
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

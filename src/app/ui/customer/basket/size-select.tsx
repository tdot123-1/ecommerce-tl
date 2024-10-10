"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface SizeSelectProps {
  sizes: string;
  handleSizeSelect: (size: string) => void;
}

const SizeSelect = ({ sizes, handleSizeSelect }: SizeSelectProps) => {
  const sizesArr = sizes.split(",");

  // const [selectedSize, setSelectedSize] = useState("");

  // const handleSizeChange = (size: string) => {
  //   setSelectedSize(size);
  // };

  // useEffect(() => {
  //   console.log("SIZE: ", selectedSize);
  // }, [selectedSize]);

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

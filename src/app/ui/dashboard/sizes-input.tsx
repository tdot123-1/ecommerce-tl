"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

const SizesInput = () => {
  //   const availableSizes = ["XS", "S", "M", "L", "XL"];

  const [availableSizes, setAvailableSizes] = useState<string[]>([
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ]);

  const [chosenSizes, setChosenSizes] = useState<string[]>([]);

  const [sizeInput, setSizeInput] = useState("");

  const handleAddBage = (selectedBadge: string) => {
    // remove from available sizes
    setAvailableSizes((prevState) =>
      prevState.filter((size) => size !== selectedBadge)
    );

    // add to selected sizes
    setChosenSizes((prevState) => [...prevState, selectedBadge]);
  };

  const handleRemoveBadge = (selectedBadge: string) => {
    // remove from selected sizes
    setChosenSizes((prevState) =>
      prevState.filter((size) => size !== selectedBadge)
    );

    // add to available sizes
    setAvailableSizes((prevState) => [...prevState, selectedBadge]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSizeInput(value);
    console.log(value)
  }

  return (
    <div>
      <div className="flex items-center gap-1 border border-zinc-300 rounded-lg px-2 py-2 min-h-10">
        {chosenSizes.length > 0 ? (
          <>
            {chosenSizes.map((sizeBadge) => (
              <Badge key={sizeBadge} className="flex items-start gap-1">
                <div>{sizeBadge}</div>
                <X
                  size={10}
                  className="cursor-pointer"
                  onClick={() => handleRemoveBadge(sizeBadge)}
                />
              </Badge>
            ))}
          </>
        ) : (
          <p className="text-sm italic">None selected</p>
        )}
      </div>
      <div className="flex items-center gap-1 border border-zinc-300 rounded-lg px-2 py-2">
        {availableSizes.map((sizeBadge) => (
          <Badge
            key={sizeBadge}
            className="flex items-start gap-1 cursor-pointer"
            onClick={() => handleAddBage(sizeBadge)}
          >
            <div>{sizeBadge}</div>
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Input className="w-16" type="text" value={sizeInput} onChange={handleInputChange} />
        <Button>Add size</Button>
      </div>
    </div>
  );
};

export default SizesInput;

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SizesInputProps {
  handleChosenSizesStr: (sizes: string[]) => void;
}

const SizesInput = ({ handleChosenSizesStr }: SizesInputProps) => {
  // standard available sizes
  const [availableSizes, setAvailableSizes] = useState<string[]>([
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ]);

  // selected sizes
  const [chosenSizes, setChosenSizes] = useState<string[]>([]);

  // turn chosen sizes into string in parent component to add to form input
  useEffect(() => {
    console.log("selected: ", chosenSizes);
    handleChosenSizesStr(chosenSizes)
  }, [chosenSizes, handleChosenSizesStr]);

  // user inputted additional sizes
  const [sizeInput, setSizeInput] = useState("");

  // move size from available to selected
  const handleAddBage = (selectedBadge: string) => {
    // remove from available sizes
    setAvailableSizes((prevState) =>
      prevState.filter((size) => size !== selectedBadge)
    );

    // add to selected sizes
    if (!chosenSizes.includes(selectedBadge)) {
      setChosenSizes((prevState) => [...prevState, selectedBadge]);
    }
  };

  // remove size from selected
  const handleRemoveBadge = (selectedBadge: string) => {
    // remove from selected sizes
    setChosenSizes((prevState) =>
      prevState.filter((size) => size !== selectedBadge)
    );

    // add to available sizes
    if (!availableSizes.includes(selectedBadge)) {
      setAvailableSizes((prevState) => [...prevState, selectedBadge]);
    }
  };

  // manually inputted additional sizes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

    const isValidInput = /^[a-zA-Z0-9]*$/.test(value);

    if (isValidInput || value === "") {
      setSizeInput(value);
    }
  };

  // add manually added size
  const handleAddInput = (typedSize: string) => {
    // add to selected sizes
    const newSize = typedSize.toUpperCase();

    if (!chosenSizes.includes(newSize)) {
      setChosenSizes((prevState) => [...prevState, newSize]);
    }

    setAvailableSizes((prevState) =>
      prevState.filter((size) => size !== newSize)
    );

    setSizeInput("");
  };

  return (
    <div className="ml-4">
      <div className="flex flex-wrap items-center gap-1 border border-zinc-300 rounded-lg px-2 py-2 min-h-10 ">
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
      <div className="flex items-center gap-2">
        <p className="text-sm">Select from available sizes:</p>
        <div className="flex flex-wrap flex-grow items-center gap-1 border border-zinc-300 rounded-lg px-2 py-2 my-1 min-h-10">
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
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm">Add new size:</p>
        <Input
          className="w-16"
          type="text"
          value={sizeInput}
          onChange={handleInputChange}
        />
        <Button
          className="p-2"
          type="button"
          onClick={() => handleAddInput(sizeInput)}
        >
          <PlusIcon size={24} />
        </Button>
      </div>
    </div>
  );
};

export default SizesInput;

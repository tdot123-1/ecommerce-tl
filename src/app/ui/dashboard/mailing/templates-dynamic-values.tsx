"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

interface TemplateDynamicValuesProps {
  handleChosenValuesStr: (values: string[]) => void;
  initialValues?: string;
}

const TemplateDynamicValues = ({
  handleChosenValuesStr,
  initialValues,
}: TemplateDynamicValuesProps) => {
  // user inputted values
  const [valuesInput, setValuesInput] = useState("");

  const [dynamicValues, setDynamicValues] = useState<string[]>([]);

  useEffect(() => {
    handleChosenValuesStr(dynamicValues);
  }, [handleChosenValuesStr, dynamicValues]);

  // handle values input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

    const isValidInput = /^[a-zA-Z0-9]*$/.test(value);

    if (isValidInput || value === "") {
      setValuesInput(value);
    }
  };

  const handleAddInput = (typedValue: string) => {
    // add to dynamic values

    if (!dynamicValues.includes(typedValue)) {
      setDynamicValues((prevState) => [...prevState, typedValue]);
    }

    setValuesInput("");
  };

  const handleRemoveBadge = (value: string) => {
    setDynamicValues((prevState) => prevState.filter((v) => v !== value));
  };

  return (
    <>
      <div className="rounded-md border border-zinc-300 p-2 flex gap-1">
        {dynamicValues.length > 0 ? (
          <>
            {dynamicValues.map((valueBadge) => (
              <Badge key={valueBadge} className="flex items-start gap-1 w-fit">
                <div>{valueBadge}</div>
                <X
                  size={10}
                  className="cursor-pointer"
                  onClick={() => handleRemoveBadge(valueBadge)}
                />
              </Badge>
            ))}
          </>
        ) : (
          <p className="text-sm italic">None</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Label>Add new value: </Label>
        <Input
          className="w-28"
          type="text"
          value={valuesInput}
          onChange={handleInputChange}
        />
        <Button
          className="p-2"
          type="button"
          onClick={() => handleAddInput(valuesInput)}
        >
          <PlusIcon size={24} />
        </Button>
      </div>
    </>
  );
};

export default TemplateDynamicValues;

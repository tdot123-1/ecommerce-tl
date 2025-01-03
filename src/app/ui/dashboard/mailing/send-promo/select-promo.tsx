"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";
import SelectPromoOptionsWrapper from "./select-promo-options-wrapper";

interface SelectPromoProps {
  type: string;
}

const SelectPromo = ({ type }: SelectPromoProps) => {
  const [promoId, setPromoId] = useState("");

  const handleChange = (value: string) => {
    console.log("Value: ", value);
    setPromoId(value);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {type === "template" ? (
            <Button type="button">Use Template</Button>
          ) : (
            <Button type="button" variant={`outline`}>
              Use Plaintext
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Promo Code</DialogTitle>
            <DialogDescription>
              Select the active promo code you would like to share with your
              customers
            </DialogDescription>
          </DialogHeader>
          <div>
            <SelectPromoOptionsWrapper handleChange={handleChange} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={`secondary`}>
                Cancel
              </Button>
            </DialogClose>
            <Link
              href={`/dashboard/mailing/promo-codes/${promoId}?type=${type}`}
            >
              <Button type="button">Craft email</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectPromo;

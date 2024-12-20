"use client";

import { fetchAllActiveCodes } from "@/lib/data/discounts/dashboard/data";
import SelectPromoOptions from "./select-promo-options";
import { useEffect, useState } from "react";

interface SelectPromoOptionsWrapperProps {
  handleChange: (value: string) => void;
}

const SelectPromoOptionsWrapper = ({
  handleChange,
}: SelectPromoOptionsWrapperProps) => {
  const [promoCodes, setPromoCodes] = useState<{ code: string; id: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const codes = await fetchAllActiveCodes();
        setPromoCodes(codes);
      } catch (error) {
        console.error("Error fetching codes on client: ", error);
      }
    };
    fetchCodes();
  }, []);

  return (
    <>
      <SelectPromoOptions handleChange={handleChange} promoCodes={promoCodes} />
    </>
  );
};

export default SelectPromoOptionsWrapper;

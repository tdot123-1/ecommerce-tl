import { fetchOnePromocodeDataForMail } from "@/lib/data/discounts/dashboard/data";
import ToggleTemplate from "./toggle-template";
import { notFound } from "next/navigation";

interface SendPromoWrapper {
  promoId: string;
  type?: string;
}

const SendPromoWrapper = async ({ promoId, type }: SendPromoWrapper) => {
  const promoData = await fetchOnePromocodeDataForMail(promoId);

  if (!promoData || !promoData.code) {
    notFound();
  }
  return (
    <>
      <ToggleTemplate promoData={promoData} type={type} />
    </>
  );
};

export default SendPromoWrapper;

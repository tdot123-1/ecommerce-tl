import { fetchOnePromocodeDataForMail } from "@/lib/data/discounts/dashboard/data";
import ToggleTemplate from "./toggle-template";

interface SendPromoWrapper {
  promoId?: string;
  type?: string;
}

const SendPromoWrapper = async ({ promoId, type }: SendPromoWrapper) => {
  if (promoId) {
    const promoData = await fetchOnePromocodeDataForMail(promoId);
    return (
      <>
        <ToggleTemplate promoData={promoData} type={type} />
      </>
    );
  } else {
    return (
      <>
        <ToggleTemplate type={type} />
      </>
    );
  }
};

export default SendPromoWrapper;

import SendPromoPlaintext from "@/app/ui/dashboard/mailing/send-promo/send-promo-plaintext";
import SendPromoWithTemplate from "@/app/ui/dashboard/mailing/send-promo/send-promo-with-template";
import SendPromoWrapper from "@/app/ui/dashboard/mailing/send-promo/send-promo-wrapper";
import { montserrat } from "@/app/ui/fonts";

const Page = ({
  params,
  searchParams,
}: {
  params: { promoId: string };
  searchParams?: { type?: string };
}) => {
  const promoId = params.promoId;
  const type = searchParams?.type;

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Share Promo Code
      </h1>
      <div className="w-full md:w-1/2 mx-auto my-10">
        <SendPromoWrapper promoId={promoId} />
      </div>
    </>
  );
};

export default Page;

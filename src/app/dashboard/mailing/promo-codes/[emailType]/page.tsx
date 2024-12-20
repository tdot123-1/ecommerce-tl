import SendPromoWithTemplate from "@/app/ui/dashboard/mailing/send-promo-with-template";
import { montserrat } from "@/app/ui/fonts";

const Page = ({
  params,
  searchParams,
}: {
  params: { emailType: string };
  searchParams?: { code?: string; percentoff?: string };
}) => {
  const emailType = params.emailType;
  const code = searchParams?.code;
  const percentOff = searchParams?.percentoff;

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Share Promo Code
      </h1>
      <div>
        {emailType === "template" && (
          <SendPromoWithTemplate
            code={code}
            percentOff={percentOff ? parseInt(percentOff) : undefined}
          />
        )}
      </div>
    </>
  );
};

export default Page;

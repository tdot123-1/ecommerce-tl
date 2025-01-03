import SendTemplateWrapper from "@/app/ui/dashboard/mailing/send-email/send-template-wrapper";
import { montserrat } from "@/app/ui/fonts";

const Page = ({ params }: { params: { templateId: string } }) => {
  const { templateId } = params;

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Send Template Email
      </h1>
      <section className="w-full md:w-1/2 mx-auto my-10">
        <SendTemplateWrapper templateId={templateId} />
      </section>
    </>
  );
};

export default Page;

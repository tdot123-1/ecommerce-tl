import { fetchOneTemplate } from "@/lib/data/mailing/data";
import { notFound } from "next/navigation";
import SendTemplate from "./send-template";

interface SendTemplateWrapperProps {
  templateId: string;
}

const SendTemplateWrapper = async ({
  templateId,
}: SendTemplateWrapperProps) => {
  const templateData = await fetchOneTemplate(templateId);

  if (!templateData || !templateData.sendgrid_id) {
    notFound();
  }

  return (
    <>
      <SendTemplate templateData={templateData} />
    </>
  );
};

export default SendTemplateWrapper;

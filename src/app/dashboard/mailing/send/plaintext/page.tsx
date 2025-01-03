import SendPlaintext from "@/app/ui/dashboard/mailing/send-email/send-plaintext";
import { montserrat } from "@/app/ui/fonts";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Send plaintext email
      </h1>
      <div className="w-full md:w-1/2 mx-auto my-10">
        <SendPlaintext />
      </div>
    </>
  );
};

export default Page;

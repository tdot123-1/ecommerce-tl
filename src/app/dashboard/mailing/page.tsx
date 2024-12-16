import MailTemplatesTable from "@/app/ui/dashboard/mailing/mail-templates-table";
import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Mailing
      </h1>

      <div className="mt-8 p-4 bg-zinc-200 dark:bg-zinc-900 rounded-lg">
        <h2 className={`${montserrat.className} text-lg font-semibold`}>
          Dynamic Templates
        </h2>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-4">
          You can view your dynamic templates on the SendGrid dashboard under
          the tab 'Email API/Dynamic Templates'.
        </p>
        <div className="mx-auto w-fit mb-2">
          <Link href="/dashboard/mailing/templates/add">
            <Button variant="outline" className="p-2">
              <div className="flex justify-center items-center gap-1 font-semibold">
                <PlusCircleIcon size={24} />
                Add Template
              </div>
            </Button>
          </Link>
        </div>
        <MailTemplatesTable />
      </div>
      <div className="mt-1 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
        <h2 className={`${montserrat.className} text-lg font-semibold`}>
          Customer authentication
        </h2>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-4">
          Emailing is used for signing up and verifying customer profiles.
        </p>
        <p>
          Upon signing up, the customer receives a welcome email with a link to
          verify their profile
        </p>
        <p>
          When an existing customer logs in, they receive an email to
          authenticate and log into their accont
        </p>
        <p></p>
      </div>
      <div className="mt-1 p-4 bg-zinc-200 dark:bg-zinc-900 rounded-lg">
        <h2 className={`${montserrat.className} text-lg font-semibold`}>
          Promo codes
        </h2>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-4">
          Emailing is used for communicating to customers about new discounts
          and promotions.
        </p>
        <p>Default template:</p>
        <p>Change default template</p>
        <p>Send new promo code email</p>
      </div>
      <div className="mt-1 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg mb-8">
        <h2 className={`${montserrat.className} text-lg font-semibold`}>
          Advertising / Other
        </h2>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-4">
          Use the emailing service to inform customers about new products,
          limited offers, or anything else you wish to communicate.
        </p>
        <p>Send email</p>
        <p>Template</p>
        <p>Plain Text</p>
      </div>
    </>
  );
};

export default Page;

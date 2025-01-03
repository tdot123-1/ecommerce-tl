import ChangeDefaultTemplateWrapper from "@/app/ui/dashboard/mailing/change-default-template-wrapper";
import MailTemplatesTable from "@/app/ui/dashboard/mailing/mail-templates-table";
import SelectPromo from "@/app/ui/dashboard/mailing/send-promo/select-promo";
import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
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
          the tab &apos;Email API/Dynamic Templates&apos;.
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
        <h3 className="font-semibold">Signup</h3>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-2">
          Upon signing up, the customer receives a welcome email with a link to
          verify their profile
        </p>
        <div className="pl-4 flex items-center gap-1">
          <p>Template: </p>
          <ChangeDefaultTemplateWrapper templatesCategory={`signup`} />
        </div>
        <h3 className="font-semibold">Signin</h3>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-2">
          When an existing customer logs in, they receive an email to
          authenticate and log into their accont
        </p>
        <div className="pl-4 flex items-center gap-1">
          <p>Template: </p>
          <ChangeDefaultTemplateWrapper templatesCategory={`signin`} />
        </div>
      </div>
      <div className="mt-1 p-4 bg-zinc-200 dark:bg-zinc-900 rounded-lg">
        <h2 className={`${montserrat.className} text-lg font-semibold`}>
          Promo codes
        </h2>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-4">
          Emailing is used for communicating to customers about new discounts
          and promotions.
        </p>
        <div className="pl-4 flex items-center gap-1 mb-4">
          <p>Template: </p>
          <ChangeDefaultTemplateWrapper templatesCategory={`discount`} />
        </div>
        <h3 className="font-semibold">Send new promo code by email</h3>
        <div className="flex gap-2 mt-2 pl-4">
          <SelectPromo type="template" />
          <SelectPromo type="plaintext" />
        </div>
      </div>
      <div className="mt-1 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg mb-8">
        <h2 className={`${montserrat.className} text-lg font-semibold`}>
          Advertising / Other
        </h2>
        <p className="italic text-sm text-zinc-800 dark:text-zinc-400 mb-4">
          Use the emailing service to inform customers about new products,
          limited offers, or anything else you wish to communicate.
        </p>
        <h3 className="font-semibold">Send email</h3>
        <div className="flex gap-2 mt-2 pl-4">
          <Button>Use Template</Button>
          <Link href={`/dashboard/mailing/send/plaintext`}>
            <Button variant={`outline`}>Use Plaintext</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;

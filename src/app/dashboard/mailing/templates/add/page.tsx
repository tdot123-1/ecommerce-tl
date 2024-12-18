import AddTemplate from "@/app/ui/dashboard/mailing/add-template";
import { montserrat } from "@/app/ui/fonts";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Add Template
      </h1>
      <div className="my-4">
        <p className="mb-2 text-sm">
          You can design dynamic email templates on the SendGrid dashboard. Then
          add them here to use them for this app
        </p>
        <ul className="pl-4 list-disc">
          <li>
            Go to <span className="italic font-semibold">Design Library</span>{" "}
            on SendGrid
          </li>
          <li>
            Craft your design by clicking{" "}
            <span className="italic font-semibold">Create Email Design</span>
          </li>
          <li>
            Go to <span className="italic font-semibold">Email API</span> /{" "}
            <span className="italic font-semibold">Dynamic Templates</span>
          </li>
          <li>
            Click{" "}
            <span className="italic font-semibold">
              Create a Dynamic Template
            </span>
            , provide a name and click{" "}
            <span className="italic font-semibold">Create</span>
          </li>
          <li>
            Now click your created template name, click{" "}
            <span className="italic font-semibold">Add Version</span>
          </li>
          <li>Select your design.</li>
          <li>
            Finally, copy the{" "}
            <span className="italic font-semibold">Template ID</span> from your
            template, and paste it into the form below
          </li>
          <li>
            The <span className="italic font-semibold">Template ID</span> should
            look something like this:{" "}
            <span className="text-zinc-700 italic">d-123abc45.......</span>
          </li>
        </ul>
      </div>
      <div className="my-10 w-full md:w-1/2 mx-auto">
        <AddTemplate />
      </div>
    </>
  );
};

export default Page;

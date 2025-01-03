"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendTemplateEmail } from "@/lib/actions/mailing/actions";
import { LoaderPinwheelIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TemplateData {
  sendgrid_id: string;
  name: string;
  category: string;
  dynamic_values: string;
}

interface SendTemplateProps {
  templateData: TemplateData;
}

const SendTemplate = ({ templateData }: SendTemplateProps) => {
  const { name, sendgrid_id, category, dynamic_values } = templateData;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const dynamicValuesArr = dynamic_values
    .split(",")
    .filter((key) => key !== "name");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    setError("");

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    try {
      const result = await sendTemplateEmail(formData);
      if (result.success) {
        toast({
          title: "Template Email sent!",
          description:
            "An email has been sent with your chosen template to all your customers.",
        });
        router.push("/dashboard/mailing");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.log("Error sending email: ", error);
      setError("Something went wrong. Failed to send email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="py-4 bg-zinc-300 dark:bg-zinc-800 rounded-t-lg mb-2">
        <div className="bg-zinc-100 dark:bg-zinc-900 p-2">
          <div className="flex justify-between text-sm">
            <p className="font-bold">Template Name: </p>
            <p className="text-zinc-800 dark:text-zinc-300 italic">{name}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="font-bold">Category: </p>
            <p className="text-zinc-800 dark:text-zinc-300 italic">
              {category}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-xs text-zinc-800 dark:text-zinc-300 italic text-center">
              This template is already populated with text and/or images. You
              can review the template on your SendGrid dashboard. Use the form
              below to fill out the dynamic values and send the email to all
              customers.
            </p>
            <p className="mt-4 text-xs">
              <span className="font-bold text-sm">Note</span>: if this template
              includes the &quot;name&quot; dynamic value, this refers to the
              recipients&apos; name. The name will be generated for each
              recipient individually
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="">SendGrid ID</Label>
          <Input
            name="sendgrid_id"
            id="sendgrid_id"
            type="text"
            disabled={isLoading}
            defaultValue={sendgrid_id}
            readOnly
          />
        </div>
        {dynamicValuesArr.map((value) => (
          <div key={value} className="mb-4">
            <Label>{value}</Label>
            <Textarea name={value} id={value} required disabled={isLoading} />
          </div>
        ))}
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-5">
            <Link href={`/dashboard/mailing`}>
              <Button type="button" variant={`secondary`}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <div className="flex justify-center items-center gap-2">
                {isLoading ? (
                  <LoaderPinwheelIcon size={20} className="animate-spin" />
                ) : (
                  <SendIcon size={20} />
                )}
                <span>Send Mail</span>
              </div>
            </Button>
          </div>
          {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default SendTemplate;

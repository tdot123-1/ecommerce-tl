"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendPlaintextEmail } from "@/lib/actions/mailing/actions";
import { State } from "@/lib/actions/products/actions";
import { LoaderPinwheelIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SendPlaintext = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    try {
      const result = await sendPlaintextEmail(formData);

      if (result.success) {
        toast({
          title: "Email sent!",
          description:
            "Your email has been sent to all of your customers.",
        });
        router.push("/dashboard/mailing");
      } else {
        setState(result);
      }
    } catch (error) {
      console.error("Error sending emails: ", error);
      setState({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="subject">Subject</Label>
          <p className="text-zinc-700 dark:text-zinc-400 text-xs italic">
            Give a descriptive subject to your email.
          </p>
          <Input
            name="subject"
            id="subject"
            type="text"
            disabled={isLoading}
            className=""
          />
          <div>
            {state.errors?.subject &&
              state.errors.subject.map((error: string, index) => (
                <p
                  key={`${error}-${index}`}
                  className="text-red-600 text-sm italic mt-1"
                >
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="text">Text</Label>
          <p className="text-zinc-700 dark:text-zinc-400 text-xs italic">
            The main text content of your email.
          </p>
          <Textarea
            name="text"
            id="text"
            disabled={isLoading}
            className="min-h-40"
          />
          <div>
            {state.errors?.text &&
              state.errors.text.map((error: string, index) => (
                <p
                  key={`${error}-${index}`}
                  className="text-red-600 text-sm italic mt-1"
                >
                  {error}
                </p>
              ))}
          </div>
        </div>
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
          {state.message && (
            <p className="text-red-600 text-sm italic mt-1">{state.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendPlaintext;

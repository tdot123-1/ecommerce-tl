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

interface SendPromoPlaintextProps {
  code?: string;
  percentOff?: number;
}

const SendPromoPlaintext = ({ code, percentOff }: SendPromoPlaintextProps) => {
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

    console.log("FORM CLIENT: ", formData);

    try {
      const result = await sendPlaintextEmail(formData);

      if (result.success) {
        toast({
          title: "Promo Code sent!",
          description:
            "An email has been sent to inform your customers of the new discount",
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
      <div className="text-center mb-4">
        <h2 className="font-semibold">Using Plaintext</h2>
        <p className="text-sm mb-2 text-zinc-800 dark:text-zinc-400 italic">
          For a plaintext email you write the complete email. The email will
          include only the text you submit, and every recipient will receive the
          exact same content.
        </p>
        <Link
          href={`/dashboard/mailing/promo-codes/template?code=${code || ""}&percentoff=${percentOff || ""}`}
        >
          <Button type="button" size={`sm`}>
            Use Template
          </Button>
        </Link>
      </div>
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
            The main text content of your email. Remember to mention the promo
            code, conditions, and the discount.
          </p>
          <Textarea name="text" id="text" disabled={isLoading} className="min-h-40" />
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

export default SendPromoPlaintext;
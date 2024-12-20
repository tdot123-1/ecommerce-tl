"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendPromoEmailTemplate } from "@/lib/actions/mailing/actions";
import { State } from "@/lib/actions/products/actions";
import { LoaderPinwheelIcon, PercentIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SendPromoWithTemplateProps {
  code?: string;
  percentOff?: number;
}

const SendPromoWithTemplate = ({
  code,
  percentOff,
}: SendPromoWithTemplateProps) => {
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
      const result = await sendPromoEmailTemplate(formData);

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
      <h2>Use default template</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="code">Promo Code</Label>
          <Input
            name="code"
            id="code"
            type="text"
            disabled={isLoading}
            defaultValue={code}
            className=""
            readOnly={!!code}
          />
          <div>
            {state.errors?.code &&
              state.errors.code.map((error: string, index) => (
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
          <Label htmlFor="percent_off">Percent off</Label>
          <div className="flex items-center gap-1">
            <Input
              name="percent_off"
              id="percent_off"
              type="number"
              disabled={isLoading}
              className=""
              defaultValue={percentOff}
              readOnly={!!percentOff}
            />
            <PercentIcon />
          </div>
          <div>
            {state.errors?.percent_off &&
              state.errors.percent_off.map((error: string, index) => (
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
          <Label htmlFor="code">Conditions</Label>
          <Textarea
            name="conditions"
            id="conditions"
            disabled={isLoading}
            className=""
          />
          <div>
            {state.errors?.conditions &&
              state.errors.conditions.map((error: string, index) => (
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

export default SendPromoWithTemplate;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyCustomerEmail } from "@/lib/actions/mailing/actions";
import { State } from "@/lib/actions/products/actions";
import { LoaderPinwheelIcon, MailCheckIcon } from "lucide-react";
import { useState } from "react";
import ResendMail from "./resend-mail";

//(!) TEST COMPONENT

const SendMagicLink = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setState({ message: null, errors: {} });
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);
    console.log("FROM CLIENT: ", formData);

    const submittedEmail = formData.get("email");

    try {
      if (!submittedEmail) {
        throw new Error("Missing email");
      }

      const result = await verifyCustomerEmail(formData);
      if (result.success) {
        setEmail(submittedEmail as string);
        setResend(true);
      } else {
        setState(result);
      }
    } catch (error) {
      console.error("Login error: ", error);
      setState({
        message: "Something went wrong. Please try again",
        errors: {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-md p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Sign in</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                disabled={isLoading}
                type="email"
                name="email"
                id="email"
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="w-fit mx-auto sm:mx-0"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <LoaderPinwheelIcon size={20} className="animate-spin" />
                  ) : (
                    <MailCheckIcon size={20} />
                  )}
                  <span>Send</span>
                </div>
              </Button>
            </div>
            <div>
              {state.errors?.email &&
                state.errors.email.map((error: string, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="text-red-600 text-sm italic mt-1"
                  >
                    {error}
                  </p>
                ))}
            </div>
            {state.message && (
              <p className="text-red-600 text-sm italic mt-1">
                {state.message}
              </p>
            )}
            {resend && <ResendMail email={email} category="signin" />}
          </div>
        </form>
      </div>
    </>
  );
};

export default SendMagicLink;

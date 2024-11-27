"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyCustomerEmail } from "@/lib/actions/mailing/actions";
import { State } from "@/lib/actions/products/actions";
import { useState } from "react";

//(!) TEST COMPONENT

const VerifyCustomer = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);
    console.log("FROM CLIENT: ", formData);

    try {
      const result = await verifyCustomerEmail(formData);
      setState(result);
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
      <div className="bg-zinc-300 rounded-md fixed left-1 bottom-1 p-2">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Sign in</Label>
            <div className="flex flex-row gap-1">
              <Input disabled={isLoading} type="email" name="email" id="email" />
              <Button disabled={isLoading} type="submit">
                Send
              </Button>
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyCustomer;

"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronsUpDown } from "lucide-react";
import { montserrat } from "../../fonts";
import { useState } from "react";
import { State } from "@/lib/actions/products/actions";
import { signUpCustomer } from "@/lib/actions/mailing/actions";

const SignupForm = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);
    console.log("FROM CLIENT: ", formData);

    try {
      const result = await signUpCustomer(formData);
      setState(result);
    } catch (error) {
      console.error("Registration error: ", error);
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
      <Collapsible className="fixed bottom-2 right-1 z-50">
        <div className="flex justify-between items-center p-4 w-fit gap-x-4 bg-zinc-300 dark:bg-zinc-700 rounded-md">
          <h4 className={`${montserrat.className} font-semibold`}>
            Sign Up For Discounts!
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <p className="hidden">Toggle sign up form</p>
              <ChevronsUpDown size={24} />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="w-72 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-md">
          <div className="">
            <form onSubmit={handleSubmit} className="">
              <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" type="text" disabled={isLoading} />
                <div>
                  {state.errors?.name &&
                    state.errors.name.map((error: string, index) => (
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  name="email"
                  id="email"
                  type="text"
                  disabled={isLoading}
                />
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
              </div>
              <div className="mb-4">
                <p className="text-sm mb-0.5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
                  sunt deserunt accusantium natus. Officiis illum quia, magnam
                  dolor numquam odio delectus impedit rerum! Deserunt distinctio
                  itaque, aperiam labore eveniet iure.
                </p>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" name="agree" disabled={isLoading} />
                  <Label htmlFor="agree">
                    I Agree <span className="text-red-600">*</span>
                  </Label>
                </div>
                <div>
                  {state.errors?.agree &&
                    state.errors.agree.map((error: string, index) => (
                      <p
                        key={`${error}-${index}`}
                        className="text-red-600 text-sm italic mt-1"
                      >
                        {error}
                      </p>
                    ))}
                </div>
              </div>
              <div>
                <Button type="submit" disabled={isLoading}>
                  Submit
                </Button>
                {state.message && (
                  <p className="text-red-600 text-sm italic mt-1">
                    {state.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default SignupForm;

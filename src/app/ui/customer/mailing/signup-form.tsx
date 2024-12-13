"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupCustomerWithTemplate } from "@/lib/actions/mailing/actions";
import { State } from "@/lib/actions/products/actions";
import { useState } from "react";
import ResendMail from "./resend-mail";

const SignupForm = () => {
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

      const result = await signupCustomerWithTemplate(formData);
      if (result.success) {
        setEmail(submittedEmail as string);
        setResend(true);
      } else {
        setState(result);
      }
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
        <Input name="email" id="email" type="text" disabled={isLoading} />
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui sunt
          deserunt accusantium natus. Officiis illum quia, magnam dolor numquam
          odio delectus impedit rerum! Deserunt distinctio itaque, aperiam
          labore eveniet iure.
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
          <p className="text-red-600 text-sm italic mt-1">{state.message}</p>
        )}
        {resend && <ResendMail email={email} />}
      </div>
    </form>
  );
};

export default SignupForm;

"use client";

import { registerUser } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { State } from "@/lib/actions";
import { LoaderPinwheelIcon, LogInIcon } from "lucide-react";
import { useState } from "react";

const Form = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formData);

    // returns errors if there were any
    setState(result);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" disabled={isLoading} />
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
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          id="password"
          type="password"
          disabled={isLoading}
        />
        <div>
          {state.errors?.password &&
            state.errors.password.map((error: string, index) => (
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
        <Label>Confirm Password</Label>
        <Input
          name="confirm"
          id="confirm"
          type="password"
          disabled={isLoading}
        />
        <div>
          {state.errors?.confirm &&
            state.errors.confirm.map((error: string, index) => (
              <p
                key={`${error}-${index}`}
                className="text-red-600 text-sm italic mt-1"
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button type="submit" disabled={isLoading}>
          <div className="flex justify-center items-center gap-2">
            {isLoading ? (
              <LoaderPinwheelIcon size={20} className="animate-spin" />
            ) : (
              <LogInIcon size={20} />
            )}
            <span>Register</span>
          </div>
        </Button>
        {state.message && (
          <p className="text-red-600 text-sm italic mt-1">{state.message}</p>
        )}
      </div>
    </form>
  );
};

export default Form;

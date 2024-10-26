"use client";

import { authenticate } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderPinwheelIcon, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    const result = await authenticate(formData);
    console.log(result);

    if (result) {
      setError(result);
    } else {
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="email">Email address</Label>
        <Input name="email" id="email" type="email" disabled={isLoading} />
      </div>
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          id="password"
          type="password"
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-center items-center flex-col mb-4">
        <Button type="submit" disabled={isLoading}>
          <div className="flex justify-center items-center gap-2">
            {isLoading ? (
              <LoaderPinwheelIcon size={20} className="animate-spin" />
            ) : (
              <LogInIcon size={20} />
            )}
            <span>Login</span>
          </div>
        </Button>
        {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
      </div>
    </form>
  );
};

export default Form;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { State } from "@/lib/actions/products/actions";
import { LoaderPinwheelIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TemplateDynamicValues from "./templates-dynamic-values";
import { addMailTemplate } from "@/lib/actions/mailing/config/actions";

const AddTemplate = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicValuesStr, setDynamicValuesStr] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleChosenValuesStr = (values: string[]) => {
    setDynamicValuesStr(values.join(","));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    try {
      // create new template
      const result = await addMailTemplate(formData);

      if (!result.success) {
        setState(result);
      } else {
        toast({
          title: "New Template Added!",
        });

        router.push(`/dashboard/mailing`);
      }
    } catch (error) {
      console.error("Error adding template: ", error);
      setState({ message: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="sendgrid_id">SendGrid Template ID</Label>
          <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
            Copy the &apos;Template ID&apos; from SendGrid
          </p>
          <Input
            name="sendgrid_id"
            id="sendgrid_id"
            type="text"
            disabled={isLoading}
            className=""
          />
          <div>
            {state.errors?.sendgrid_id &&
              state.errors.sendgrid_id.map((error: string, index) => (
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
          <Label htmlFor="name">Name</Label>
          <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
            Use a unique name to easily find this template. Tip: use the same
            name you used for your SendGrid design.
          </p>
          <Input
            name="name"
            id="name"
            type="text"
            disabled={isLoading}
            className=""
          />
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
        {/** Category select */}
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
            Select what this email template will be used for.
          </p>
          <Select name="category">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="signin">Signin</SelectItem>
              <SelectItem value="signup">Signup</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="advertising">Advertising</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <div>
            {state.errors?.category &&
              state.errors.category.map((error: string, index) => (
                <p
                  key={`${error}-${index}`}
                  className="text-red-600 text-sm italic mt-1"
                >
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/** Dynamic values */}
        <div className="mb-4">
          <Label htmlFor="dynamic_values">Dynamic Values</Label>
          <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
            {`Make sure you provide all the dynamic values that you used in this template, one by one, without the curly braces {{ }}`}
          </p>
          <Input
            className="hidden"
            type="hidden"
            readOnly
            value={dynamicValuesStr}
            name="dynamic_values"
            id="dynamic_values"
          />
          <TemplateDynamicValues
            handleChosenValuesStr={handleChosenValuesStr}
          />
          <div>
            {state.errors?.dynamic_values &&
              state.errors.dynamic_values.map((error: string, index) => (
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
                  <PlusCircleIcon size={20} />
                )}
                <span>Add Template</span>
              </div>
            </Button>
          </div>
          {state.message && (
            <p className="text-red-600 text-sm italic mt-1">{state.message}</p>
          )}
        </div>
      </form>
    </>
  );
};

export default AddTemplate;

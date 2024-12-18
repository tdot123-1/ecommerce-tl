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

const AddTemplate = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicValuesStr, setDynamicValuesStr] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleChosenValuesStr = (values: string[]) => {
    setDynamicValuesStr(values.join(","));
  };

  return (
    <>
      <form>
        <div className="mb-4">
          <Label htmlFor="sendgrid_id">SendGrid ID</Label>
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
          <Label>Dynamic Values</Label>
          <Input
            className="hidden"
            type="hidden"
            readOnly
            value={dynamicValuesStr}
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

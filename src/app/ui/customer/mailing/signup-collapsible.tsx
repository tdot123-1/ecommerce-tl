import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { montserrat } from "../../fonts";
import SignupForm from "./signup-form";

const SignupCollapsible = () => {
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
            <SignupForm />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default SignupCollapsible;

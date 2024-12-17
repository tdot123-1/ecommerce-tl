"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { changeMailTemplate } from "@/lib/actions/mailing/config/actions";
import { State } from "@/lib/actions/products/actions";
import { capitalize } from "@/lib/utils";
import { LoaderPinwheelIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

interface ChangeDefaultTemplateProps {
  defaultTemplate: string;
  templates: string[];
  category: string;
}

const ChangeDefaultTemplate = ({
  defaultTemplate,
  templates,
  category,
}: ChangeDefaultTemplateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);
    console.log("FORM: ", formData);

    try {
      const result = await changeMailTemplate(formData, category);
      if (!result.success) {
        setState(result);
      } else {
        toast({
          title: "Mail template updated!",
          description: `Template: ${result.newDefault} is now used for ${category} mailing.`,
        });

        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating coupon name: ", error);
      setState({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p>{defaultTemplate}</p>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Change</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Change email template</DialogTitle>
          <DialogDescription>
            This action will change the email template used for {category}. Make
            sure the new template communicates all the relevant information
            before changing.
          </DialogDescription>
          <div>
            <form id="changeTemplateForm">
              <Select name="name" disabled={isLoading || !templates.length}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      templates.length
                        ? "Select a template"
                        : "No other templates"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{capitalize(category)}</SelectLabel>
                    {templates.length ? (
                      templates.map((template) => (
                        <SelectItem value={template}>{template}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">No other templates</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            </form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={`secondary`} disabled={isLoading} type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant={`default`}
              disabled={isLoading}
              type="submit"
              form="editNameForm"
            >
              <div className="flex justify-center items-center gap-2">
                {isLoading ? (
                  <LoaderPinwheelIcon size={20} className="animate-spin" />
                ) : (
                  <SaveIcon size={20} />
                )}
                <span>Save Changes</span>
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeDefaultTemplate;

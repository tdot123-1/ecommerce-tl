"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";
import TemplateSelectWrapper from "./template-select-wrapper";

const TemplateDialog = () => {
  const [templateId, setTemplateId] = useState<string>("");

  const handleChange = (template: string) => {
    console.log("Template: ", template);
    setTemplateId(template);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Use Template</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Template</DialogTitle>
            <DialogDescription>
              Choose the template you wish to use for this email.
            </DialogDescription>
          </DialogHeader>
          <div>
            <TemplateSelectWrapper handleChange={handleChange} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={`secondary`}>
                Cancel
              </Button>
            </DialogClose>
            {templateId ? (
              <Link href={`/dashboard/mailing/send/template/${templateId}`}>
                <Button disabled={!templateId} type="button">
                  Craft email
                </Button>
              </Link>
            ) : (
              <Button disabled type="button">
                Craft email
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplateDialog;

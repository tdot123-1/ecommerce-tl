"use client";

import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";

const ScrollToUploadButton = () => {

  const scrollToUpload = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() => scrollToUpload()}
      >
        <p className="hidden">Add Image</p>
        <PlusSquareIcon size={24} />
      </Button>
    </>
  );
};

export default ScrollToUploadButton;

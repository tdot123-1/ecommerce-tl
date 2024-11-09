"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon, UploadIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { upload } from "@vercel/blob/client";
import { PutBlobResult } from "@vercel/blob";
import { addProductImage } from "@/lib/actions";

interface UploadSectionProps {
  productId: string;
}

const UploadSection = ({ productId }: UploadSectionProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // check if file has been selected
    if (!inputFileRef.current?.files) {
      setError("No file selected.");
      setIsLoading(false);
      return;
    }

    const file = inputFileRef.current.files[0];

    // attempt to upload file to blob store
    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/images/upload",
      });

      setBlob(newBlob);
      // console.log(blob);

      addProductImage(productId, newBlob.url);

      //   setImageUrl(newBlob.url);
    } catch (error) {
      console.error("ERROR UPLOADING FILE: ", error);
      setError("Something went wrong.");
    } finally {
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
        setBlob(null);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center md:flex-row md:items-end justify-start gap-2">
          <div className="w-full md:w-fit">
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input
              name="image-upload"
              id="image-upload"
              ref={inputFileRef}
              className="md:ml-4 cursor-pointer disabled:cursor-wait"
              type="file"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="md:ml-4" disabled={isLoading}>
            <div className="flex justify-center items-center gap-2">
              {isLoading ? (
                <LoaderPinwheelIcon size={20} className="animate-spin" />
              ) : (
                <UploadIcon size={20} />
              )}
              <span>Upload</span>
            </div>
          </Button>
        </div>
        <div>
          {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default UploadSection;

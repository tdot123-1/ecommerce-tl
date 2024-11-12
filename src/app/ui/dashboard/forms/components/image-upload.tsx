"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLinkIcon, LoaderPinwheelIcon, UploadIcon } from "lucide-react";
import { type PutBlobResult } from "@vercel/blob";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { deleteImageFromStore } from "@/lib/actions/images/actions";

interface ImageUploadProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
}

const ImageUpload = ({ setImageUrl, imageUrl }: ImageUploadProps) => {
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
      // check if an image had already been uploaded -> delete blob if so
      if (imageUrl) {
        await deleteImageFromStore(imageUrl)
      }
      
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/images/upload",
      });

      setBlob(newBlob);
      setImageUrl(newBlob.url);
    } catch (error) {
      console.error("ERROR UPLOADING FILE: ", error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="flex items-end justify-start gap-2">
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input
              name="image-upload"
              id="image-upload"
              ref={inputFileRef}
              className="ml-4 cursor-pointer disabled:cursor-wait"
              type="file"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="ml-4" disabled={isLoading}>
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
      <div className="mb-4">
        <p className="text-sm">Review uploaded image</p>
        {blob ? (
          <a
            className="text-xs italic ml-4 text-blue-600 mt-1"
            target="_blank"
            href={blob.url}
          >
            <div className="flex justify-start items-start gap-1">
              <span>View image</span>
              <ExternalLinkIcon size={12} />
            </div>
          </a>
        ) : (
          <p className="text-xs italic ml-4 text-red-600 mt-1">
            Not yet uploaded
          </p>
        )}
      </div>
    </>
  );
};

export default ImageUpload;

"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { montserrat } from "../../fonts";
import { Badge } from "@/components/ui/badge";
import {
  LoaderPinwheelIcon,
  LucideX,
  PlusCircleIcon,
  SaveIcon,
  TagIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { updateTags } from "@/lib/actions/tags/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EditTagsProps {
  productId: string;
  name: string;
  imageUrl: string;
  productTags: string[];
  allTags: string[];
}

const EditTags = ({
  productId,
  name,
  imageUrl,
  productTags,
  allTags,
}: EditTagsProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(productTags);
  const [availableTags, setAvailableTags] = useState<string[]>(allTags);
  const [tagsInput, setTagsInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const updatedAvailableTags = allTags.filter(
      (tag) => !productTags.includes(tag)
    );

    setAvailableTags(updatedAvailableTags);
  }, [allTags, productTags]);

  const handleAddBadge = (selectedBadge: string) => {
    // remove from available tags
    setAvailableTags((prevState) =>
      prevState.filter((tag) => tag !== selectedBadge)
    );

    // add to selected tags
    if (!selectedTags.includes(selectedBadge)) {
      setSelectedTags((prevState) => [...prevState, selectedBadge]);
    }
  };

  // remove tag from selected
  const handleRemoveBadge = (selectedBadge: string) => {
    // remove from selected tags
    setSelectedTags((prevState) =>
      prevState.filter((tag) => tag !== selectedBadge)
    );

    // add to available tags
    if (!availableTags.includes(selectedBadge)) {
      setAvailableTags((prevState) => [...prevState, selectedBadge]);
    }
  };

  // manually inputted additional sizes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

    const isValidInput = /^[a-zA-Z0-9]*$/.test(value);

    if (isValidInput || value === "") {
      setTagsInput(value);
    }
  };

  // add manually added tag
  const handleAddInput = (e: React.FormEvent, typedTag: string) => {
    e.preventDefault();
    // add to selected tags
    const newTag = typedTag.toLowerCase();

    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prevState) => [...prevState, newTag]);
    }

    setAvailableTags((prevState) => prevState.filter((tag) => tag !== newTag));

    setTagsInput("");
  };

  const handleSaveChanges = async () => {
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      await updateTags(productId, selectedTags);
      router.push("/dashboard/products/tags");
    } catch (error) {
      console.error("Error updating tags: ", error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-4 gap-5 flex-wrap">
        <div className="w-40 relative">
          <AspectRatio ratio={8 / 9}>
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, 
                      (max-width: 1024px) 30vw, 
                      (max-width: 1280px) 20vw, 
                      15vw"
              className="rounded-md"
            />
          </AspectRatio>
        </div>
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>
          {name}
        </h2>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-center md:justify-evenly md:items-start items-center gap-2 md:gap-0">
          <div>
            <h3 className="text-sm">Selected Tags</h3>
            <ul className="border border-zinc-300 rounded-md p-4 grid grid-cols-2 gap-1">
              {selectedTags.map((tag, i) => (
                <li key={`p-${tag}-${i}`}>
                  <Badge
                    onClick={() => handleRemoveBadge(tag)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      {tag} <LucideX size={18} />
                    </div>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm">Available Tags</h3>
            <ul className="border border-zinc-300 rounded-md p-4 grid grid-cols-2 gap-1">
              {availableTags.map((tag, i) => (
                <li key={`a-${tag}-${i}`}>
                  <Badge
                    onClick={() => handleAddBadge(tag)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      {tag} <TagIcon size={18} />
                    </div>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 sm:w-1/2 lg:w-1/4 mx-auto">
          <Label>Add Tag</Label>
          <form onSubmit={(e) => handleAddInput(e, tagsInput)}>
            <div className="flex items-center gap-1">
              <Input
                type="text"
                value={tagsInput}
                onChange={handleInputChange}
              />
              <Button variant={`outline`} className="p-2" type="submit">
                <p className="hidden">Add tag</p>
                <PlusCircleIcon size={24} />
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center w-fit mx-auto my-6">
          <div className="flex justify-center items-center gap-2">
            <Link href={`/dashboard/products/tags`}>
              <Button type="button" variant={`secondary`} disabled={isLoading}>
                Cancel
              </Button>
            </Link>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleSaveChanges}
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
          </div>
          {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default EditTags;

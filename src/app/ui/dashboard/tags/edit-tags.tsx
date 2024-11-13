"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { montserrat } from "../../fonts";
import { Badge } from "@/components/ui/badge";
import { LucideX, PlusCircleIcon, SaveIcon, Tag, TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface EditTagsProps {
  name: string;
  imageUrl: string;
  productTags: string[];
  allTags: string[];
}

const EditTags = ({ name, imageUrl, productTags, allTags }: EditTagsProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(productTags);
  const [availableTags, setAvailableTags] = useState<string[]>(allTags);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    const updatedAvailableTags = allTags.filter(
      (tag) => !productTags.includes(tag)
    );

    setAvailableTags(updatedAvailableTags);
  }, []);

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

  return (
    <>
      <div className="flex justify-center items-center p-4 gap-10">
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
            <h3>Selected Tags</h3>
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
            <h3>Available Tags</h3>
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
        <div>
          <Label>Add Tag</Label>
          <form onSubmit={(e) => handleAddInput(e, tagsInput)}>
            <div className="flex items-center gap-1">
              <Input
                type="text"
                value={tagsInput}
                onChange={handleInputChange}
              />
              <Button
                variant={`outline`}
                className="p-2"
                type="submit"
              >
                <p className="hidden">Add tag</p>
                <PlusCircleIcon size={24} />
              </Button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center my-6 gap-2 ">
          <Button variant={`secondary`}>Cancel</Button>
          <Button>
            <div className="flex justify-center items-center gap-2">
              Save Changes <SaveIcon size={20} />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditTags;

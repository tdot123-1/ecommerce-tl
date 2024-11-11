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
import { Textarea } from "@/components/ui/textarea";
import { createProduct, State } from "@/lib/actions";
import { categories } from "@/lib/categories";
import { capitalize } from "@/lib/utils";
import { LoaderPinwheelIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SizesInput from "./components/sizes-input";
import ImageUpload from "./components/image-upload";
import CancelButton from "./components/cancel-create-btn";

const Form = () => {
  // keep track of errors in form state
  const [state, setState] = useState<State>({ message: null, errors: {} });

  const [chosenSizesStr, setChosenSizesStr] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // get array of chosen sizes from child component, turn into string, add value to form input
  const handleChosenSizesStr = (sizes: string[]) => {
    setChosenSizesStr(sizes.join(","));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);
    const result = await createProduct(formData);

    // returns errors if there were any
    setState(result);
    setIsLoading(false);

    // returns empty string in case of success -> redirect to products display
    if (!result.message) {
      router.push("/dashboard/products");
    }
  };

  return (
    <>
      <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            disabled={isLoading}
            className="ml-4"
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
        <div className="mb-4">
          <Label htmlFor="price">Price in Euro</Label>
          <Label htmlFor="cents" className="hidden">
            Price in cents
          </Label>
          <div className="flex items-baseline gap-1 ml-4">
            <span className="text-lg">€</span>
            <Input
              name="price"
              id="price"
              type="number"
              className="w-16"
              defaultValue={0}
              min={0}
              disabled={isLoading}
            />
            <span className="text-lg">,</span>
            <Input
              name="cents"
              id="cents"
              type="number"
              className="w-16"
              defaultValue={0}
              max={99}
              min={0}
              disabled={isLoading}
            />
          </div>
          <div>
            {state.errors?.price &&
              state.errors.price.map((error: string, index) => (
                <p
                  key={`${error}-${index}`}
                  className="text-red-600 text-sm italic mt-1"
                >
                  {error}
                </p>
              ))}
          </div>
          <div>
            {state.errors?.cents &&
              state.errors.cents.map((error: string, index) => (
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
          <Label htmlFor="sizes">Sizes</Label>
          <SizesInput handleChosenSizesStr={handleChosenSizesStr} />
          <Input
            className="hidden"
            type="text"
            value={chosenSizesStr}
            name="sizes"
            readOnly
          />
          <div>
            {state.errors?.sizes &&
              state.errors.sizes.map((error: string, index) => (
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            disabled={isLoading}
            className="ml-4"
          />
          <div>
            {state.errors?.description &&
              state.errors.description.map((error: string, index) => (
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
          <Label htmlFor="category">Category</Label>

          <Select defaultValue="" name="category" disabled={isLoading}>
            <SelectTrigger id="category" className="ml-4">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.title} value={category.title}>
                  {capitalize(category.title)}
                </SelectItem>
              ))}
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
        <div className="mb-4">
          <Label htmlFor="image">Image (read only)</Label>
          <Input
            name="image"
            id="image"
            type="text"
            disabled={isLoading}
            className="ml-4"
            value={imageUrl}
            readOnly
          />
          <div>
            {state.errors?.image &&
              state.errors.image.map((error: string, index) => (
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
            <CancelButton
              imageUrl={imageUrl}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <div className="flex justify-center items-center gap-2">
                {isLoading ? (
                  <LoaderPinwheelIcon size={20} className="animate-spin" />
                ) : (
                  <PlusCircleIcon size={20} />
                )}
                <span>Create Product</span>
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

export default Form;

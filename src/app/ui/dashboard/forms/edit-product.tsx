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
import { DeleteImageFromStore, editProduct, State } from "@/lib/actions";
import { categories } from "@/lib/categories";
import { EditableProduct } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { LoaderPinwheelIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SizesInput from "./components/sizes-input";
import { useRouter } from "next/navigation";
import ImageUpload from "./components/image-upload";
import DeleteImage from "./components/image-delete";

interface EditFormProps {
  product: EditableProduct;
}

const Form = ({ product }: EditFormProps) => {
  // track error state, loading state
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.image_url);

  // flag to keep track if the image has been changed or not
  const [imageChange, setImageChange] = useState(false);

  // split price to show full euros and cents in seperate input fields
  const splitPrice = (price: number) => {
    const euros = Math.floor(price / 100);
    const cents = price % 100;

    return { euros, cents };
  };

  const { euros, cents } = splitPrice(product.price);

  const [chosenSizesStr, setChosenSizesStr] = useState(product.sizes);

  const router = useRouter();

  // get array of chosen sizes from child component, turn into string, add value to form input
  const handleChosenSizesStr = (sizes: string[]) => {
    setChosenSizesStr(sizes.join(","));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // create form object, call server action
    const formData = new FormData(event.currentTarget);

    try {
      const result = await editProduct(product.id, formData);
      setState(result);

      // if the image has been changed, delete old image from blob store
      if (imageChange) {
        await DeleteImageFromStore(product.image_url);
      }
      // returns empty string in case of success -> redirect to products display
      if (!result.message) {
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Error editting product: ", error);
      setState({ message: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {/* only allow image upload if previous image has been deleted first */}
      {imageChange ? (
        <ImageUpload setImageUrl={setImageUrl} />
      ) : (
        <DeleteImage
          imageUrl={product.image_url}
          setImageChange={setImageChange}
          setImageUrl={setImageUrl}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            disabled={isLoading}
            className="ml-4"
            defaultValue={product.name}
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
              defaultValue={euros}
              min={0}
              disabled={isLoading}
            />
            <span className="text-lg">,</span>
            <Input
              name="cents"
              id="cents"
              type="number"
              className="w-16"
              defaultValue={cents}
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
          <SizesInput
            handleChosenSizesStr={handleChosenSizesStr}
            initialSizes={product.sizes}
          />
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
            defaultValue={product.description}
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

          <Select
            defaultValue={product.category}
            name="category"
            disabled={isLoading}
          >
            <SelectTrigger id="category" className="ml-4">
              <SelectValue defaultValue={product.category} />
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
            <Link href="/dashboard/products">
              <Button variant="destructive" disabled={isLoading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
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
          {state.message && (
            <p className="text-red-600 text-sm italic mt-1">{state.message}</p>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;

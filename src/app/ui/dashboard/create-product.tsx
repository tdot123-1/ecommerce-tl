"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, State } from "@/lib/actions";
import { LoaderPinwheelIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = () => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await createProduct(formData);

    setState(result);
    setIsLoading(false);
    if (!result.message) {
      router.push("/dashboard/products");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" disabled={isLoading} />
        <div>
          {state.errors?.name &&
            state.errors.name.map((error: string, index) => (
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="price">Price in Euro</Label>
        <Label htmlFor="cents" className="hidden">
          Price in cents
        </Label>
        <div className="flex items-baseline gap-1">
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
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
            ))}
        </div>
        <div>
          {state.errors?.cents &&
            state.errors.cents.map((error: string, index) => (
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="sizes">Sizes</Label>
        <Input name="sizes" id="sizes" type="text" disabled={isLoading} />
        <div>
          {state.errors?.sizes &&
            state.errors.sizes.map((error: string, index) => (
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" disabled={isLoading} />
        <div>
          {state.errors?.description &&
            state.errors.description.map((error: string, index) => (
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <Input name="category" id="category" type="text" disabled={isLoading} />
        <div>
          {state.errors?.category &&
            state.errors.category.map((error: string, index) => (
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="image">Image</Label>
        <Input name="image" id="image" type="text" disabled={isLoading} />
        <div>
          {state.errors?.image &&
            state.errors.image.map((error: string, index) => (
              <p key={`${error}-${index}`} className="text-red-600 text-sm italic mt-1">{error}</p>
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
  );
};

export default Form;

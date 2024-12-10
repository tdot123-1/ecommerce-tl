"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { State } from "@/lib/actions/products/actions";
import { LoaderPinwheelIcon, PercentIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import RedeemDatePicker from "../coupons/redeem-date-picker";
import { createCoupon } from "@/lib/actions/discounts/coupons/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Form = () => {
  // keep track of errors in form state
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [redeemDate, setRedeemDate] = useState<Date>();

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    console.log("FORM CLIENT: ", formData);

    try {
      const result = await createCoupon(formData);

      if (!result.success) {
        setState(result);
      } else {
        toast({
          title: "Coupon Created!",
          description:
            "Next, add a promo code for customers to use this coupon.",
          action: (
            <ToastAction
              onClick={() => router.push("/dashboard/discounts")}
              altText="Go to discounts"
            >
              Skip for now
            </ToastAction>
          ),
        });
        router.push(
          `/dashboard/discounts/promo-codes/create/${result.success}`
        );
      }
    } catch (error) {
      console.error("Error creating product: ", error);
      setState({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
          This name will appear on customers&apos; receipts.
        </p>
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
        <Label htmlFor="percent_off">Percent off</Label>
        <div className="ml-4 flex items-center gap-1">
          <Input
            name="percent_off"
            id="percent_off"
            type="number"
            disabled={isLoading}
            className=""
          />
          <PercentIcon />
        </div>

        <div>
          {state.errors?.percent_off &&
            state.errors.percent_off.map((error: string, index) => (
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
        <Label htmlFor="max_redemptions">Max redemptions</Label>
        <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
          Specify how many times this coupon can be redeemed in total
          (optional).
        </p>
        <Input
          name="max_redemptions"
          id="max_redemptions"
          type="number"
          disabled={isLoading}
          className="ml-4"
        />
        <div>
          {state.errors?.max_redemptions &&
            state.errors.max_redemptions.map((error: string, index) => (
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
        <Label htmlFor="redeem_by">Redeem by</Label>
        <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
          Select a date until when this coupon will be valid (optional).
        </p>
        <RedeemDatePicker
          redeemDate={redeemDate}
          setRedeemDate={setRedeemDate}
        />
        <Input
          name="redeem_by"
          id="redeem_by"
          type="hidden"
          value={redeemDate ? redeemDate.toISOString() : ""}
          className="hidden"
          readOnly
        />
        <div>
          {state.errors?.redeem_by &&
            state.errors.redeem_by.map((error: string, index) => (
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
          <Button
            type="button"
            variant={`secondary`}
            onClick={() => router.push("/dashboard/discounts")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            <div className="flex justify-center items-center gap-2">
              {isLoading ? (
                <LoaderPinwheelIcon size={20} className="animate-spin" />
              ) : (
                <PlusCircleIcon size={20} />
              )}
              <span>Create Coupon</span>
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

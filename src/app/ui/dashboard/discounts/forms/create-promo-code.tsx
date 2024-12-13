"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { State } from "@/lib/actions/products/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RedeemDatePicker from "../coupons/redeem-date-picker";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon, PlusCircleIcon } from "lucide-react";
import { createPromoCode } from "@/lib/actions/discounts/codes/actions";
import { ToastAction } from "@/components/ui/toast";

interface FormProps {
  couponId: string;
}

const Form = ({ couponId }: FormProps) => {
  // keep track of errors in form state
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [redeemDate, setRedeemDate] = useState<Date>();
  const [minAmount, setMinAmount] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    console.log("FORM CLIENT: ", formData);

    // get raw form data
    const rawFormData = Object.fromEntries(formData.entries());

    console.log("FORM: ", rawFormData);

    try {
      const result = await createPromoCode(formData);

      if (!result.success) {
        setState(result);
      } else {
        toast({
          title: "Promo Code Created!",
          description:
            "Finally, send an email to your customers to inform them about the new promo.",
          action: (
            <ToastAction
              onClick={() => router.push("/dashboard/discounts")}
              altText="Go to discounts"
            >
              Skip for now
            </ToastAction>
          ),
        });
        router.push(`/dashboard/mailing/promo-codes/${result.success}`);
      }
    } catch (error) {
      console.error("Error creating product: ", error);
      setState({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name="coupon"
          id="coupon"
          type="hidden"
          value={couponId}
          className="hidden"
          readOnly
        />
        <div>
          {state.errors?.coupon &&
            state.errors.coupon.map((error: string, index) => (
              <p
                key={`${error}-${index}`}
                className="text-red-600 text-sm italic my-2"
              >
                {error}
              </p>
            ))}
        </div>
        <div className="mb-4">
          <Label htmlFor="code">Code</Label>
          <div className="pl-4">
            <p className=" text-xs italic text-zinc-700 dark:text-zinc-400">
              This is the code that customers will use to redeem the discount.
            </p>
            <Input name="code" id="code" type="text" disabled={isLoading} />
          </div>

          <div>
            {state.errors?.code &&
              state.errors.code.map((error: string, index) => (
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
          <div className="pl-4">
            <p className=" text-xs italic text-zinc-700 dark:text-zinc-400">
              Specify how many times this promo code can be redeemed in total
              (optional).
            </p>
            <Input
              name="max_redemptions"
              id="max_redemptions"
              type="number"
              disabled={isLoading}
            />
          </div>

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
          <div className="pl-4">
            <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
              Select a date until when this promo code will be valid (optional).
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
          </div>
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

        <div className="mb-4">
          <Label htmlFor="minimum_amount">Minimum order value</Label>
          <div className="pl-4">
            <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
              Specify a minimum order value for this promo code to be applicable
              to (optional).
            </p>
            <Switch
              id="minimum_amount"
              disabled={isLoading}
              name="minimum_amount"
              checked={minAmount}
              onCheckedChange={() => setMinAmount(!minAmount)}
            />
          </div>
        </div>

        {minAmount && (
          <div className="mb-4">
            <Label htmlFor="min_euros">Minimum value in Euro</Label>
            <Label htmlFor="min_cents" className="hidden">
              Minimum value in cents
            </Label>
            <div className="flex items-baseline gap-1 pl-4">
              <span className="text-lg">€</span>
              <Input
                name="min_euros"
                id="min_euros"
                type="number"
                className="w-16"
                defaultValue={0}
                min={0}
                disabled={isLoading}
              />
              <span className="text-lg">,</span>
              <Input
                name="min_cents"
                id="min_cents"
                type="number"
                className="w-16"
                defaultValue={0}
                max={99}
                min={0}
                disabled={isLoading}
              />
            </div>
            <div>
              {state.errors?.min_euros &&
                state.errors.min_euros.map((error: string, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="text-red-600 text-sm italic mt-1"
                  >
                    {error}
                  </p>
                ))}
            </div>
            <div>
              {state.errors?.min_cents &&
                state.errors.min_cents.map((error: string, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="text-red-600 text-sm italic mt-1"
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="first_time_transaction">
            First time purchase only
          </Label>
          <div className="pl-4">
            <p className="text-xs italic text-zinc-700 dark:text-zinc-400">
              Select this option if you want this code to only work for
              customers who have never made a purchase before.
            </p>
            <Checkbox
              id="first_time_transaction"
              name="first_time_transaction"
              disabled={isLoading}
            />
          </div>

          <div>
            {state.errors?.first_time_transaction &&
              state.errors.first_time_transaction.map(
                (error: string, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="text-red-600 text-sm italic mt-1"
                  >
                    {error}
                  </p>
                )
              )}
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
                <span>Create Promocode</span>
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

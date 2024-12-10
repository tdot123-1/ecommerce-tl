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

const Form = () => {
  // keep track of errors in form state
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [redeemDate, setRedeemDate] = useState<Date>();
  const [minAmount, setMinAmount] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  return (
    <>
      <form>
        <div className="mb-4">
          <Label htmlFor="code">Code</Label>
          <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
            This is the code that customers will use to redeem the discount.
          </p>
          <Input
            name="code"
            id="code"
            type="text"
            disabled={isLoading}
            className="ml-4"
          />
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
          <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
            Specify how many times this promo code can be redeemed in total
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

        <div className="mb-4">
          <Label htmlFor="minimum_amount">Minimum order value</Label>
          <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
            Specify a minimum order value for this promo code to be applicable
            to (optional).
          </p>
          <Switch
            id="minimum_amount"
            disabled={isLoading}
            name="minimum_amount"
            className="ml-4"
            checked={minAmount}
            onCheckedChange={() => setMinAmount(!minAmount)}
          />
        </div>

        {minAmount && (
          <div className="mb-4">
            <Label htmlFor="min_euro">Minimum value in Euro</Label>
            <Label htmlFor="min_cents" className="hidden">
              Minimum value in cents
            </Label>
            <div className="flex items-baseline gap-1 ml-4">
              <span className="text-lg">€</span>
              <Input
                name="min_euro"
                id="min_euro"
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
              {state.errors?.min_euro &&
                state.errors.min_euro.map((error: string, index) => (
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
          <p className="ml-4 text-xs italic text-zinc-700 dark:text-zinc-400">
            Select this option if you want this code to only work for customers
            who have never made a purchase before.
          </p>
          <Checkbox
            id="first_time_transaction"
            name="first_time_transaction"
            disabled={isLoading}
            className="ml-4"
          />
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
